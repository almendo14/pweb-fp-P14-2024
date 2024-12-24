import { Request, Response } from 'express';
import BorrowItemModel from '../models/BorrowItemModel'; // Adjust the import path as necessary
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const getBorrowSummary = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, borrowerName } = req.query;

        // Query database with optional filters
        const query: any = {};
        if (startDate && endDate) {
            query.borrow_date = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
        }
        if (borrowerName) {
            query.borrower_name = { $regex: borrowerName, $options: 'i' }; // Case-insensitive search
        }

        const borrowItems = await BorrowItemModel.find(query);
        res.status(200).json(borrowItems);
    } catch (error) {
        console.error('Error fetching borrow summary:', error);
        res.status(500).send('Error fetching borrow summary');
    }
};

export const generatePDF = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, borrowerName } = req.query;

        // Query database with optional filters
        const query: any = {};
        if (startDate && endDate) {
            query.borrow_date = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
        }
        if (borrowerName) {
            query.borrower_name = { $regex: borrowerName, $options: 'i' };
        }

        const borrowItems = await BorrowItemModel.find(query);

        // Generate PDF using jsPDF
        const doc = new jsPDF() as jsPDF & { autoTable: any };
        doc.text('Laporan Peminjaman', 10, 10);
        doc.autoTable({
            head: [['No', 'Nama Barang', 'Jumlah', 'Tgl. Pinjam', 'Tgl. Kembali', 'Peminjam', 'Petugas']],
            body: borrowItems.map((item, index) => [
                index + 1,
                item.item_name,
                item.amount,
                new Date(item.borrow_date).toLocaleDateString(),
                item.return_date ? new Date(item.return_date).toLocaleDateString() : 'N/A',
                item.borrower_name,
                item.officer_name,
            ]),
        });

        const pdfBuffer = doc.output('arraybuffer');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="laporan_peminjaman.pdf"');
        res.send(Buffer.from(pdfBuffer));
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
};
