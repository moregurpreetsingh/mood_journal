package com.mood.journal.controller;


import org.springframework.http.CacheControl;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.Map;


@RestController
@RequestMapping("/pdf")
public class PdfController {

	@PostMapping("/download")
    public ResponseEntity<byte[]> downloadPdfFromBase64(@RequestBody Map<String, String> body) {
        try {
            String base64Pdf = body.get("base64Html");

            if (base64Pdf == null || base64Pdf.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // Remove prefix if present
            if (base64Pdf.startsWith("data:")) {
                base64Pdf = base64Pdf.substring(base64Pdf.indexOf(",") + 1);
            }

            // Clean string (remove newlines, spaces)
            base64Pdf = base64Pdf.replaceAll("\\s+", "");

            // Decode Base64 to bytes
            byte[] pdfBytes = Base64.getMimeDecoder().decode(base64Pdf);

            // 🧾 Set response headers to trigger browser download
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(
                    ContentDisposition.builder("attachment")
                            .filename("downloaded.pdf")
                            .build()
            );
            headers.setCacheControl(CacheControl.noCache().getHeaderValue());

            // 📨 Return as downloadable file
            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentLength(pdfBytes.length)
                    .body(pdfBytes);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }
}
