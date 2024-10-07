import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { StyleSheet } from "@react-pdf/renderer";



const Page1 = ({ formData }) => {
  styles = StyleSheet.create({
    page: {
      padding: 30 ,
      fontSize: 12,
      fontFamily: "Helvetica",
      backgroundColor: "#ffffff",
    },
    header: {
      marginBottom: 20,
      textAlign: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 10,
    },
    section: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    leftColumn: {
      width: "45%",
    },
    rightColumn: {
      width: "45%",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },
    companyInfo: {
      marginBottom: 5,
    },
    clientInfo: {
      marginBottom: 5,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      marginBottom: 20,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#f2f2f2",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      fontWeight: "bold",
    },
    tableHeaderText: {
      width: "25%",
      padding: 8,
      textAlign: "center",
      borderRightWidth: 1,
      borderRightColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      width: "25%",
      padding: 8,
      textAlign: "center",
      borderRightWidth: 1,
      borderRightColor: "#000",
    },
    totalsContainer: {
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: "#000",
      paddingTop: 10,
    },
    totalsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    totalsLabel: {
      fontWeight: "bold",
      fontSize: 14,
    },
    totalsValue: {
      fontSize: 14,
    },
    footer: {
      marginTop: 20,
      textAlign: "center",
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
    },
    footerText: {
      fontSize: 12,
      color: "#555",
    },
  });
  return (
    <View style={styles.page}>
      {/* Invoice Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.subtitle}>Invoice Date: {formData.invoiceDate}</Text>
      </View>

      {/* Company and Client Information */}
      <View style={styles.section}>
        <View style={styles.leftColumn}>
          <Text style={styles.sectionTitle}>Company Information</Text>
          <Text style={styles.companyInfo}>{formData.companyName}</Text>
          <Text style={styles.companyInfo}>{formData.companyAddress}</Text>
          <Text style={styles.companyInfo}>{formData.companyEmail}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <Text style={styles.clientInfo}>{formData.clientName}</Text>
          <Text style={styles.clientInfo}>{formData.clientAddress}</Text>
          <Text style={styles.clientInfo}>{formData.clientEmail}</Text>
        </View>
      </View>

      {/* Invoice Items */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Description</Text>
          <Text style={styles.tableHeaderText}>Quantity</Text>
          <Text style={styles.tableHeaderText}>Unit Price</Text>
          <Text style={styles.tableHeaderText}>Total</Text>
        </View>

        {formData.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.description}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>{item.unitPrice}</Text>
            <Text style={styles.tableCell}>{item.total}</Text>
          </View>
        ))}
      </View>

      {/* Invoice Totals */}
      <View style={styles.totalsContainer}>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>Subtotal:</Text>
          <Text style={styles.totalsValue}>{formData.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>Tax ({formData.taxRate}%):</Text>
          <Text style={styles.totalsValue}>{formData.taxAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>Total:</Text>
          <Text style={styles.totalsValue}>{formData.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for your business!</Text>
      </View>
    </View>
  );
};

export default Page1;
