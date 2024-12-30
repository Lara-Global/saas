// src/@types/jspdf-autotable.d.ts
import { jsPDF } from 'jspdf';

declare module 'jspdf' {
    interface jsPDF {
        autoTable: any; // Adjust the type as necessary
    }
}
