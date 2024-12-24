<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
            <h2 class="text-2xl font-bold text-gray-900">Data Peminjaman</h2>
        </div>
        <div class="border-t border-gray-200">
            <div class="px-4 py-5 sm:p-6">
                <!-- Filters Section -->
                <div class="mb-4 flex space-x-4">
                    <input 
                        type="date" 
                        v-model="filters.startDate" 
                        class="border px-2 py-1 rounded-md" 
                        placeholder="Start Date" 
                    />
                    <input 
                        type="date" 
                        v-model="filters.endDate" 
                        class="border px-2 py-1 rounded-md" 
                        placeholder="End Date" 
                    />
                    <input 
                        type="text" 
                        v-model="filters.borrowerName" 
                        class="border px-2 py-1 rounded-md" 
                        placeholder="Peminjam" 
                    />
                    <button 
                        @click="fetchBorrowItems" 
                        class="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Filter
                    </button>
                    <button 
                        @click="clearFilters" 
                        class="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                        Clear Filters
                    </button>
                    <button 
                        @click="downloadPDF"
                        class="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                        Download PDF
                    </button>
                </div>

                <!-- Loading Indicator -->
                <div v-if="loading" class="text-center py-4">
                    <span class="text-gray-500">Loading...</span>
                </div>

                <!-- Table Section -->
                <div class="overflow-x-auto">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="table-header">No</th>
                                        <th scope="col" class="table-header">Nama Barang</th>
                                        <th scope="col" class="table-header">Jumlah</th>
                                        <th scope="col" class="table-header">Tgl. Pinjam</th>
                                        <th scope="col" class="table-header">Tgl. Kembali</th>
                                        <th scope="col" class="table-header">Peminjam</th>
                                        <th scope="col" class="table-header">Petugas</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200" v-if="borrowItems.length > 0">
                                    <tr v-for="(item, index) in borrowItems" :key="item._id">
                                        <td class="table-cell">{{ index + 1 }}</td>
                                        <td class="table-cell">{{ item.item_name }}</td>
                                        <td class="table-cell">{{ item.amount }}</td>
                                        <td class="table-cell">{{ formatDate(item.borrow_date) }}</td>
                                        <td class="table-cell">{{ formatDate(item.return_date) }}</td>
                                        <td class="table-cell">{{ item.borrower_name }}</td>
                                        <td class="table-cell">{{ item.officer_name }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="7" class="text-center text-lg text-gray-500">No borrow items available.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getToken } from '@/stores/auth';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface BorrowItem {
    _id: string;
    item_name: string;
    amount: number;
    borrow_date: string;
    return_date: string;
    borrower_name: string;
    officer_name: string;
}

export default defineComponent({
    name: 'BorrowSummary',
    setup() {
        const borrowItems = ref<BorrowItem[]>([]);
        const filters = ref({ startDate: '', endDate: '', borrowerName: '' });
        const token = getToken();
        const loading = ref(false); // New loading state

        // Fetch borrow items from the server
        const fetchBorrowItems = async () => {
            loading.value = true; // Show loading spinner
            try {
                const response = await axios.get('http://localhost:5000/admin/summary', {
                    params: filters.value,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                borrowItems.value = response.data;
            } catch (error) {
                console.error('Error fetching borrow items:', error);
            } finally {
                loading.value = false; // Hide loading spinner
            }
        };

        // Clear all filters
        const clearFilters = async () => {
            filters.value = { startDate: '', endDate: '', borrowerName: '' };
            await fetchBorrowItems();
        };

        // Download the PDF with the filtered data
        const downloadPDF = () => {
            const doc = new jsPDF() as jsPDF & { autoTable: any };
            doc.text("Borrow Item Summary", 14, 16);
            doc.autoTable({
                head: [['#', 'Item Name', 'Amount', 'Borrow Date', 'Return Date', 'Borrower Name', 'Officer Name']],
                body: borrowItems.value.map((borrow, index) => [
                index + 1,
                borrow.item_name,
                borrow.amount,
                formatDate(borrow.borrow_date),
                formatDate(borrow.return_date),
                borrow.borrower_name,
                borrow.officer_name,
                ]),
                startY: 20,
            });
            const timestamp = new Date();
            const formattedDate = formatDate(timestamp.toISOString(), true);
            const sanitizedFilename = formattedDate.replace(/[\/:*?"<>|]/g, '-');  // Remove invalid characters for filenames
            doc.save(`borrow_summary_${sanitizedFilename}.pdf`);
            };


        // Format date in local format
        const formatDate = (date: string, includeTime: boolean = false) => {
            const options: Intl.DateTimeFormatOptions = includeTime
                ? { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }
                : { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Date(date).toLocaleDateString(undefined, options);
        };

        // Fetch all data on component mount
        onMounted(() => {
            fetchBorrowItems();
        });

        return {
            borrowItems,
            filters,
            fetchBorrowItems,
            clearFilters,
            downloadPDF,
            formatDate,
            loading, // Include loading state
        };
    },
});
</script>

<style scoped>
.table-header {
    @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.table-cell {
    @apply px-6 py-4 whitespace-nowrap text-sm text-gray-500;
}

</style>
