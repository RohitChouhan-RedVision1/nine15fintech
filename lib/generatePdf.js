import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

// Function to capture the graph and generate the PDF
export const generatePDF = async (data, title, startDate, endDate, graphId) => {
    const doc = new jsPDF();

    // Add title and metadata
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(11);
    doc.text(`From: ${startDate} To: ${endDate}`, 14, 32);

    // Capture the graph as an image
    const graphElement = document.getElementById(graphId);
    if (graphElement) {
        const canvas = await html2canvas(graphElement);
        const graphImgData = canvas.toDataURL('image/png');
        // Add the graph image to the PDF
        doc.addImage(graphImgData, 'PNG', 14, 40, 180, 90);  // Adjust size and position
    }

    // Create table columns and rows
    const columns = [
        "Date", "Nav", "Amt", "Unit", "Cumulative Unit", "Cumulative Amt", "Valuation"
    ];

    const rows = data?.map((item) => [
        item.navDate,
        item.nav,
        item.cashFlow,
        item.units,
        item.cumulitiveUnits,
        item.amount,
        item.currentValue,
    ]);

    // Add some space after the graph
    const tableStartY = graphElement ? 140 : 40;

    // Add the table
    autoTable(doc, {
        head: [columns],
        body: rows,
        startY: tableStartY,
    });

    // Add footer text
    doc.setFontSize(10);
    doc.text(
        "Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully.",
        14,
        doc.internal.pageSize.height - 10
    );

    // Save the PDF
    doc.save(`${title}.pdf`);
};
