# IEPF & Unclaimed Dividend Analyzer

> An offline, single-file tool that reads **IEPF / unclaimed-dividend PDFs** and instantly ranks the **highest-value holders** — with Excel/CSV export, shares, and pincodes.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Offline](https://img.shields.io/badge/100%25-offline-success)
![No build needed](https://img.shields.io/badge/no%20install-just%20open-orange)

Companies in India publish lists of shareholders whose unpaid/unclaimed dividends and shares are due to be transferred to the **Investor Education and Protection Fund (IEPF)**. These PDFs are large, inconsistently formatted, and painful to skim. This tool turns any pile of them into a single, searchable, **value-ranked table** in seconds — without uploading anything anywhere.

---

## ✨ Features

- **Drag-and-drop** one or many PDFs — results appear instantly, ranked highest → lowest value.
- **Combine duplicate holders** across folios and files (sums their amounts/shares).
- **Captures** holder name, **amount (₹)**, **number of shares**, **folio / DP-Client ID**, and **pincode**.
- **Shares-aware** — files that list only shares (no rupee amount) are automatically ranked by shares.
- **Export to Excel (.xls) and CSV**, copy to clipboard, with a TOTAL row.
- **Search**, **minimum-₹ filter**, **Top-N**, and click-to-sort on any column.
- **Per-file column mapping** override for unusual layouts.
- **Summary cards**: total unclaimed value, unique holders, total shares, top holder.
- **Indian number formatting** (₹, lakh/crore grouping), light/dark mode.
- **100% offline & private** — everything runs in your browser; no file ever leaves your computer. The PDF engine ([PDF.js](https://github.com/mozilla/pdf.js)) is bundled directly into the file.

## 🚀 Quick start

No installation, no internet:

1. Download **[`IEPF_Analyzer.html`](IEPF_Analyzer.html)** (click the file → **Download raw**).
2. **Double-click** it to open in any modern browser (Chrome, Edge, Firefox, Safari).
3. Drag your IEPF / unclaimed-dividend PDFs onto the page.
4. Sort, filter, and **export to Excel or CSV**.

That single file is fully self-contained (~1.9 MB) — you can email it, put it on a USB stick, or run it on an air-gapped machine.

## 📄 What it reads

The parser auto-detects several real-world layout families seen in IEPF filings:

| Layout | Example | Notes |
|---|---|---|
| Standard registrar grid | single-row header, aligned columns | most company filings |
| Stacked multi-row header | MCA **IEPF-1 / IEPF-4** e-forms | header words stacked vertically |
| Wide registrar lists | serial + name + multi-line address + shares + amount | |
| Fixed-width / dot-matrix reports | one text line per holder | parsed by text rules |
| Share-transfer lists | only "No. of Shares", no rupee amount | ranked by shares |

It also detects and flags **scanned (image-only) PDFs** that have no selectable text (these need OCR first).

## 🔧 Build from source

The repository ships the prebuilt `IEPF_Analyzer.html`, so building is only needed if you change the source. The build simply inlines the PDF.js library (base64) into `src/template.html`.

```bash
# with Node.js (cross-platform, no dependencies)
node build.mjs        # or: npm run build
```

```powershell
# or on Windows with PowerShell
powershell -ExecutionPolicy Bypass -File build.ps1
```

Either command regenerates `IEPF_Analyzer.html` in the repo root.

## 📁 Project structure

```
.
├── IEPF_Analyzer.html      # ← the built, ready-to-use app (this is all an end user needs)
├── build.mjs               # Node build script (inlines pdf.js → IEPF_Analyzer.html)
├── build.ps1               # PowerShell build script (Windows)
├── package.json            # npm run build
├── src/
│   ├── template.html       # source: HTML + CSS + parser (with __PDFJS_*__ placeholders)
│   └── vendor/
│       ├── pdf.min.js          # PDF.js 3.11.174 (Apache-2.0)
│       └── pdf.worker.min.js
├── LICENSE                 # MIT (this project)
└── NOTICE.md               # third-party attributions (PDF.js)
```

All application logic — PDF parsing, column detection, ranking, export — lives in `src/template.html`.

## ⚠️ Limitations

- **Scanned PDFs** (image-only, no selectable text) can't be read without an OCR step; they're flagged accordingly.
- A few unusual formats (e.g. the dense MCA *"Amount Pending with Company (IEPF-2)"* summary, or heavily interleaved layouts) may not auto-detect the right columns — use the **column-mapping** dropdowns at the bottom of the page to fix them.
- On the very large MCA e-forms, names can include the father/husband portion when the template packs the name sub-columns tightly. Amounts, shares, and pincodes remain accurate.
- The on-screen table caps at 1,000 rows for responsiveness; **exports always contain the full list**.

## 🔒 Privacy

This tool makes **no network requests**. PDFs are read in-memory in your browser and never uploaded. You can verify this by opening it with your network disconnected.

## 👤 Author

Made by **[harshv31](https://github.com/harshv31)**.

## 📜 License

- This project: **MIT** © [harshv31](https://github.com/harshv31) — see [LICENSE](LICENSE).
- Bundled **PDF.js**: Apache-2.0 © Mozilla — see [NOTICE.md](NOTICE.md).

> Not affiliated with the MCA or the IEPF Authority. Provided as-is for analysis convenience.
