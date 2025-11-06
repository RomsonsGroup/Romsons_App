import React, { useState, useMemo, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SalesAnalysisStyle } from "../../styles/SalesAnalysisStyle";
import { darkTheme, lightTheme, Fonts, SF, SH } from "../../utils";
import { useSelector } from "react-redux";

const SalesList = ({ salesData}) => {
  const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
  const currentColors = isDarkMode ? darkTheme : lightTheme;
  const SalesAnalysisStyles = useMemo(() => SalesAnalysisStyle(currentColors), [currentColors]);
  
  const renderItem = ({ item }) => (
    <View
      style={{
        marginTop: 16,
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Dealer Code: </Text>
        <Text style={{ color: 'green', fontSize: 12 }}>{item.dealer_code}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Dealer Name: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.dealer_name}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Material Code: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.material_code}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Incoming QTY: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.incoming_qty}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Sales QTY: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.sales_qty}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Open QTY: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.open_qty}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Sales Group: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.sales_group}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Sales Group DESC: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.sales_group_desc}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Plant: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.plant}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Plant Name: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.plant_name}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Incoming Price: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.incoming_price}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Sales Price: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.sales_price}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Open Price: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.open_price}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Mat Group: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.mat_grp}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Mat Group DESC: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.mat_grp_desc}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Division: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.division}</Text>
      </Text>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>Segment: </Text>
        <Text style={{ color: 'green', fontSize: 13 }}>{item.segment}</Text>
      </Text>
    </View>
  );

//   <View style={SalesAnalysisStyles.moduleContainer}>
//   <View style={SalesAnalysisStyles.row1}>

//     {/* Open Summary */}
//     <View style={SalesAnalysisStyles.moduleBoxContainer}>
//       <Text style={SalesAnalysisStyles.headingText}>Open</Text>
//       <TouchableOpacity style={SalesAnalysisStyles.moduleBox1}>
//         <View style={SalesAnalysisStyles.moduleContent}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>Qty: </Text>
//             <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{totals.open_qty}</Text>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>Val: </Text>
//             <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{totals.open_price}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>

//     {/* Sales Summary */}
//     <View style={SalesAnalysisStyles.moduleContainer}>
//                             <View style={SalesAnalysisStyles.row1}>
//     <View style={SalesAnalysisStyles.moduleBoxContainer}>
//       <Text style={SalesAnalysisStyles.headingText}>Sale</Text>
//       <TouchableOpacity style={SalesAnalysisStyles.moduleBox1}>
//         <View style={SalesAnalysisStyles.moduleContent}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>Qty: </Text>
//             <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{totals.sales_qty}</Text>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>Val: </Text>
//             <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{totals.sales_price}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//     <View style={SalesAnalysisStyles.moduleBoxContainer}>
//       <Text style={SalesAnalysisStyles.headingText}>Open</Text>
//       <TouchableOpacity style={SalesAnalysisStyles.moduleBox1}>
//         <View style={SalesAnalysisStyles.moduleContent}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>Qty: </Text>
//             <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{totals.open_qty}</Text>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>Val: </Text>
//             <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{totals.open_price}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//     </View>
//     </View>

//   </View>
// </View>


  return (
    <FlatList
      data={salesData}
      keyExtractor={(item, index) => index.toString()} // Ensures unique keys
      renderItem={renderItem}
    />
  );
};

export default SalesList;
