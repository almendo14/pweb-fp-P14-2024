import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generatePDF = (data: any[], fileName: string) => {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../../${fileName}`);

    doc.pipe(fs.createWriteStream(filePath));

    // Menambahkan judul
    doc.fontSize(20).text('Laporan Peminjaman', { align: 'center' });
    doc.moveDown();

    // Menambahkan tabel
    doc.fontSize(12);
    doc.text('No  | Nama Barang | Jumlah Pinjam | Tgl. Pinjam | Tgl. Kembali | Peminjam | Petugas');
    doc.moveDown();

    data.forEach((item, index) => {
        doc.text(`${index + 1} | ${item.barangId.nama} | ${item.jumlahPinjam} | ${item.tglPinjam.toLocaleDateString()} | ${item.tglKembali.toLocaleDateString()} | ${item.peminjam} | ${item.petugas}`);
    });

    doc.end();

    return filePath; // Mengembalikan path file PDF yang dihasilkan
};