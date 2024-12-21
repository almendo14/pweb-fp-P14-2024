import { generatePDF } from './PDFGenerator'; // Correct relative path
import fs from 'fs';

// Test empty data
// Define the structure of a single item in the array
interface Item {
    barangId: { nama: string };
    jumlahPinjam: number;
    tglPinjam: Date;
    tglKembali: Date;
    peminjam: string;
    petugas: string;
}

// Sample data with the correct type
const sampleData: Item[] = [
    {
        barangId: { nama: 'Laptop' },
        jumlahPinjam: 1,
        tglPinjam: new Date('2024-12-01'),
        tglKembali: new Date('2024-12-15'),
        peminjam: 'John Doe',
        petugas: 'Admin'
    }
];

const fileName = 'laporan-peminjaman.pdf';
const filePath = generatePDF(sampleData, fileName);

console.log(`PDF generated at: ${filePath}`);
