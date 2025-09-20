import React, { useState, useMemo, useEffect } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity, loading, ActivityIndicator, Modal } from 'react-native'
import { DaysummaryStyle } from "../../styles/DaysummaryStyle";
import { Button, Input, Spacing, DatePicker, VectorIcon } from '../../components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, lightTheme, Fonts, SF, SH } from "../../utils";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import Moment from 'moment';

const DaysummaryScreen = () => {
  const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
  const currentColors = isDarkMode ? darkTheme : lightTheme;
  const { t } = useTranslation();
  const DaysummaryStyles = useMemo(() => DaysummaryStyle(currentColors), [currentColors]);
  const [fromDate, setFromDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  let [statuspunch, setStatuspunch] = useState([]);
  let [eodorderDetails, setEodorderDetails] = useState([]);
  let [eodactivityDetails, setEodactivitydetails] = useState([]);
  let [eodreturnDetails, setEodreturnDetails] = useState([]);
  let [taskDetails, setTaskDetails] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [teamLists, setTeamLists] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(null); // Manager’s selected team member ID

  const openModal = async () => {
    setModalVisible1(true);
    const user = await AsyncStorage.getItem("userInfor");
    const empid = JSON.parse(user);
    await teamList();

  };
  const getEffectiveEmpId = (defaultEmpId) => {
    return selectedTeamId ? selectedTeamId : defaultEmpId;
  };


  const teamList = async () => {
    const user = await AsyncStorage.getItem("userInfor");
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "enterBy": empid[0].emp_id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://crm.romsons.com:8080/ManagerTeam", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error == false) {
          // console.log('listttt', result.data);
          setTeamLists(result.data)

        }
      })
      .catch((error) => console.error(error));
  }


  const handleFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setFromDate(new Date(currentDate).toISOString().split("T")[0]);
  };

  useEffect(() => {
    if (fromDate) {
      const fetchData = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);

        // Agar manager ne team select kiya hai toh wahi id use hogi
        // warna login kiya hua employee ka emp_id use hoga
        const effectiveEmpId = selectedTeamId || empid[0].emp_id;

        handlePunchinPunchoutData(fromDate, effectiveEmpId);
        EodOrderDetails(fromDate, effectiveEmpId);
        EodActivityDetails(fromDate, effectiveEmpId);
        eodReturnDetail(fromDate, effectiveEmpId);
        AddNewTaskDetails(fromDate, effectiveEmpId);
      };

      fetchData();
    }
  }, [fromDate, selectedTeamId]);



  const AddNewTaskDetails = async (selectedDate) => {
    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "enterDate": Moment(selectedDate).format("YYYY-MM-DD"),
      "enterBy": getEffectiveEmpId(empid[0].emp_id)
    });


    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8091/TaskShowDaysummary", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error == false) {
          setTaskDetails(result.data)
        }
      })
      .catch((error) => console.error(error));
  }

  const handlePunchinPunchoutData = async (selectedDate) => {
    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "enterBy": getEffectiveEmpId(empid[0].emp_id),
      "enterDate": Moment(selectedDate).format("YYYY-MM-DD")
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8091/EODAttendancebutton", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error == false) {
          setStatuspunch(result.data);
        }
      })
      .catch((error) => console.error(error));
  };

  const EodOrderDetails = async (selectedDate) => {
    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "enterBy": getEffectiveEmpId(empid[0].emp_id),
      "enterDate": Moment(selectedDate).format("YYYY-MM-DD")
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8091/EODOrderbutton", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error == false) {
          setEodorderDetails(result.data);
        }
      })
      .catch((error) => console.error(error));
  };

  const EodActivityDetails = async (selectedDate) => {
    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "enterBy": getEffectiveEmpId(empid[0].emp_id),
      "enterDate": Moment(selectedDate).format("YYYY-MM-DD")
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8091/ActivityDatabutton", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error == false) {
          setEodactivitydetails(result.data)
        }
      })
      .catch((error) => console.error(error));
  }



  const eodReturnDetail = async (selectedDate) => {
    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "enterBy": getEffectiveEmpId(empid[0].emp_id),
      "enterDate": Moment(selectedDate).format("YYYY-MM-DD")
    });



    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8091/EodReturnbutton", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error == false) {

          setEodreturnDetails(result.data)
        }
      })
      .catch((error) => console.error(error));
  }

  const groupedData = eodactivityDetails.reduce((acc, res) => {
    if (!acc[res.outlet_id]) {
      acc[res.outlet_id] = {
        outlet_id: res.outlet_id,
        hospital_name: res.hospital_name,
        activities: [],
      };
    }
    acc[res.outlet_id].activities.push(res);
    return acc;
  }, {});

  // Convert object to array for mapping
  const groupedArray = Object.values(groupedData);

  // Function to group eodorderDetails by outlet_id
  const groupEodOrderDetailsByOutlet = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.outlet_id]) {
        acc[item.outlet_id] = {
          outlet_id: item.outlet_id,
          outlet_name: item.outlet_name,
          orders: {},
        };
      }
      if (!acc[item.outlet_id].orders[item.m_orderID]) {
        acc[item.outlet_id].orders[item.m_orderID] = [];
      }
      acc[item.outlet_id].orders[item.m_orderID].push(item);
      return acc;
    }, {});
  };

  // Group the data
  const groupedEodOrderDetails = groupEodOrderDetailsByOutlet(eodorderDetails);


  const groupEodReturnDetailByOutlet = (data) => {
    return data.reduce((acc, item) => {
      if (!item.outlet_id || !item.m_return_orderID) {
        return acc;
      }

      if (!acc[item.outlet_id]) {
        acc[item.outlet_id] = {
          outlet_id: item.outlet_id,
          outlet_name: item.outlet_name,
          orders: {},
        };
      }

      if (!acc[item.outlet_id].orders[item.m_return_orderID]) {
        acc[item.outlet_id].orders[item.m_return_orderID] = [];
      }

      // Corrected Push Operation
      acc[item.outlet_id].orders[item.m_return_orderID].push(item);
      return acc;
    }, {});
  };

  const groupedEodReturnDetails = groupEodReturnDetailByOutlet(eodreturnDetails);

  const groupedTaskDetails = taskDetails.reduce((acc, res) => {
    if (!acc[res.enter_by]) {
      acc[res.enter_by] = {
        enter_by: res.enter_by,
        tasks: [],
      };
    }
    acc[res.enter_by].tasks.push(res);
    return acc;
  }, {});




  return (
    <View style={{ flex: 1 }}>
      <View style={DaysummaryStyles.dateRow}>
        <TouchableOpacity style={DaysummaryStyles.pendingButton} onPress={openModal}>
          <Text style={DaysummaryStyles.pendingText}>Team</Text>
        </TouchableOpacity>
        <View style={DaysummaryStyles.datePickerWrapper}>
          <DatePicker
            selectedDate={handleFromDateChange}
            setDate={setFromDate}
            style={DaysummaryStyles.datePicker}
          />
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible1}
        animationType="fade"
        onRequestClose={() => setModalVisible1(false)}
      >
        <View style={DaysummaryStyles.modalOverlay4}>
          <View style={DaysummaryStyles.dropdownContainer4}>

            {/* Beautiful Close Button */}
            <TouchableOpacity
              onPress={() => setModalVisible1(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: '#f2f2f2',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5, // for Android shadow
                shadowColor: '#000', // for iOS shadow
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>×</Text>
            </TouchableOpacity>

            {/* Modal Content */}
            {loading ? (
              <ActivityIndicator size="medium" color="#0000ff" style={{ marginTop: 50 }} />
            ) : (
              <ScrollView style={{ marginTop: 50 }}>
                {teamLists.length > 0 ? (
                  teamLists.map((team, index) => (
                    <TouchableOpacity
                      key={index}
                      style={DaysummaryStyles.option4}
                      onPress={() => {
                        setSelectedTeam(team.reporting_person_name);
                        setSelectedTeamId(team.emp_id);  // ✅ Store selected team member’s ID
                        setModalVisible1(false);
                      }}

                    >
                      <Text style={DaysummaryStyles.optionText4}>
                        {team.reporting_person_name}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={{ textAlign: 'center', padding: 10 }}>

                  </Text>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
      <Text>{selectedTeam}</Text>

      {statuspunch.map((res, ind) => (
        <View style={DaysummaryStyles.datesContainer} key={ind}>
          <Text style={DaysummaryStyles.dateText1}>
            {Moment(res.punch_in).format(' hh:mm:ss a')}
          </Text>
          <Text style={DaysummaryStyles.dateText1}>
            {Moment(res.punch_out).format(' hh:mm:ss a')}
          </Text>
        </View>
      ))}

      {/* Iterate over grouped data */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header for each outlet */}
        <View>
          {Object.keys(groupedEodOrderDetails).map((outletId) => {
            const outlet = groupedEodOrderDetails[outletId];
            return (
              <View key={outletId}>
                {/* Outlet Info (Displayed Once) */}
                <View style={DaysummaryStyles.infoContainer}>
                  <Text style={DaysummaryStyles.hospitalText}>
                    {outlet.outlet_id}, {outlet.outlet_name}
                  </Text>
                </View>

                {/* Orders for each outlet */}
                {Object.keys(outlet.orders).map((orderId) => {
                  const orderItems = outlet.orders[orderId];

                  let totalAmt = 0; // Initialize total amount for this order

                  return (
                    <View key={orderId} style={{ marginHorizontal: 20, marginTop: 10 }}>
                      <View style={DaysummaryStyles.orderContainer}>
                        <Text style={DaysummaryStyles.orderType}>Type: Order</Text>
                        <Text style={DaysummaryStyles.orderId}>OrderID: {orderId}</Text>
                      </View>

                      {/* SKU Table */}
                      <View style={DaysummaryStyles.skuContainer}>
                        <View style={DaysummaryStyles.skuHeaderRow}>
                          <Text style={DaysummaryStyles.skuHeaderText}>SKU Name</Text>
                          <Text style={DaysummaryStyles.skuHeaderText}>Unit Price</Text>
                          <Text style={DaysummaryStyles.skuHeaderText}>Unit</Text>
                          <Text style={DaysummaryStyles.skuHeaderText}>Amount</Text>
                        </View>

                        {orderItems.map((res, ind) => {
                          totalAmt += parseFloat(res.order_amt || 0);

                          return (
                            <View key={ind}>
                              <View style={DaysummaryStyles.skuDataRow}>
                                <Text style={DaysummaryStyles.skuText}>{res.sku_name}</Text>
                                <Text style={DaysummaryStyles.skuText1}>{res.item_price_unit}</Text>
                                <Text style={DaysummaryStyles.skuText1}>{res.item_qty}</Text>
                                <Text style={DaysummaryStyles.skuText1}>{res.order_amt}</Text>
                              </View>

                              {/* Total Row - Show only after last item */}
                              {ind === orderItems.length - 1 && (
                                <View style={DaysummaryStyles.skuDataRow}>
                                  <Text style={[DaysummaryStyles.skuText, { fontWeight: 'bold' }]}>Total</Text>
                                  <Text style={DaysummaryStyles.skuText1}></Text>
                                  <Text style={DaysummaryStyles.skuText1}></Text>
                                  <Text style={[DaysummaryStyles.skuText1, { color: 'green', fontWeight: 'bold' }]}>
                                    ₹{totalAmt.toFixed(2)}
                                  </Text>
                                </View>
                              )}
                            </View>
                          );

                        })}
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}

        </View>

        {/* Date Header */}
        <View>
          {groupedArray.map((group, index) => (
            <View key={index}>
              {/* Outlet ID and Hospital Name (Displayed Once Per Group) */}
              <View style={DaysummaryStyles.infoContainer1}>
                <Text style={DaysummaryStyles.hospitalText}>
                  {group.outlet_id}, {group.hospital_name}
                </Text>
              </View>
              <Text style={{ marginHorizontal: 20, marginTop: 8, color: 'black', fontWeight: 'bold' }}>Type: Activity</Text>
              {/* Activities related to the same outlet */}
              {group.activities.map((res, ind) => (
                <View
                  key={ind}
                  style={{
                    marginTop: 16,
                    padding: 12,
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    marginHorizontal: 20,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 3,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    <Text style={{ color: 'black', fontSize: 13 }}>Customer Name: </Text>
                    <Text style={{ color: 'green', fontSize: 12 }}>{res.hospital_customer_name}</Text>
                  </Text>

                  <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                    <Text style={{ color: 'black', fontSize: 13 }}>SKU Name: </Text>
                    <Text style={{ color: 'green', fontSize: 13 }}>{res.sku_name}</Text>
                  </Text>

                  <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                    <Text style={{ color: 'black', fontSize: 13 }}>Remarks: </Text>
                    <Text style={{ color: 'green', fontSize: 13 }}>{res.remark}</Text>
                  </Text>

                  <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                    <Text style={{ color: 'black', fontSize: 13 }}>Follow Up: </Text>
                    <Text style={{ color: 'green', fontSize: 13 }}>
                      {res.follow_up && !isNaN(new Date(res.follow_up).getTime())
                        ? new Date(res.follow_up).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })
                        : ''}
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {groupedEodReturnDetails && Object.keys(groupedEodReturnDetails).length > 0 ? (
          Object.keys(groupedEodReturnDetails).map((outletId) => {
            const outlet = groupedEodReturnDetails[outletId];
            return (
              <View key={outletId}>
                {/* Outlet Info (Displayed Once) */}
                <View style={DaysummaryStyles.infoContainer3}>
                  <Text style={DaysummaryStyles.hospitalText}>
                    {outlet.outlet_id}, {outlet.outlet_name}
                  </Text>
                </View>

                {/* Orders for each outlet */}
                {outlet.orders && Object.keys(outlet.orders).length > 0 ? (
                  Object.keys(outlet.orders).map((orderId) => {
                    const orderItems = outlet.orders[orderId];
                    return (
                      <View key={orderId} style={{ marginHorizontal: 20, marginTop: 8 }}>
                        <View style={DaysummaryStyles.orderContainer}>
                          <Text style={DaysummaryStyles.orderType}>Type: Return</Text>
                          <Text style={DaysummaryStyles.orderId}>OrderID: {orderId}</Text>
                        </View>

                        {/* SKU Table */}
                        <View style={DaysummaryStyles.skuContainer}>
                          <View style={DaysummaryStyles.skuHeaderRow}>
                            <Text style={DaysummaryStyles.skuHeaderText}>SKU Name</Text>
                            <Text style={DaysummaryStyles.skuHeaderText}>Unit Price</Text>
                            <Text style={DaysummaryStyles.skuHeaderText}>Unit</Text>
                            <Text style={DaysummaryStyles.skuHeaderText}>Amount</Text>
                          </View>

                          {orderItems.map((res, ind) => (
                            <View key={ind}>
                              <View style={DaysummaryStyles.skuDataRow}>
                                <Text style={DaysummaryStyles.skuText}>{res.sku_name}</Text>
                                <Text style={DaysummaryStyles.skuText}>{res.item_price_unit}</Text>
                                <Text style={DaysummaryStyles.skuText}>{res.item_qty}</Text>
                                <Text style={DaysummaryStyles.skuText}>{res.return_order_amt}</Text>
                              </View>

                              {/* Total Row - Show only after last item */}
                              {/* {ind === orderItems.length - 1 && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                          <Text style={{ marginHorizontal: 10, color: 'black', fontWeight: 'bold' }}>Total</Text>
                          <Text style={{ marginHorizontal: 10, color: 'green', fontWeight: 'bold', fontSize: 13 }}>
                            {res.total_quantity}
                          </Text>
                        </View>
                      )} */}
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <Text style={{ textAlign: 'center', marginTop: 10 }}>No Orders Found</Text>
                )}
              </View>
            );
          })
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 10 }}></Text>
        )}


        {Object.keys(groupedTaskDetails).map((empId) => {
          const group = groupedTaskDetails[empId];
          return (
            <View key={empId}>
              {/* <View style={DaysummaryStyles.infoContainer1}>
                <Text style={DaysummaryStyles.hospitalText}>
                  Employee ID: {group.enter_by}
                </Text>
              </View> */}

              <Text style={{ marginHorizontal: 20, marginTop: 8, color: 'black', fontWeight: 'bold' }}>
                Type: New Task
              </Text>

              {group.tasks.map((res, ind) => (
                <View
                  key={ind}
                  style={{
                    marginTop: 16,
                    padding: 12,
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    marginHorizontal: 20,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 3,
                  }}
                >
                  <Text><Text style={{ color: 'black' }}>Task Name: </Text><Text style={{ color: 'green' }}>{res.task_name}</Text></Text>
                  <Text><Text style={{ color: 'black' }}>Remarks: </Text><Text style={{ color: 'green' }}>{res.remarks}</Text></Text>
                  <Text><Text style={{ color: 'black' }}>Status: </Text><Text style={{ color: 'green' }}>{res.status}</Text></Text>
                  <Text><Text style={{ color: 'black' }}>Joint Id: </Text><Text style={{ color: 'green' }}>{res.joint_id}</Text></Text>
                  <Text><Text style={{ color: 'black' }}>Joint Name: </Text><Text style={{ color: 'green' }}>{res.joint_name}</Text></Text>
                  <Text><Text style={{ color: 'black' }}>Priority: </Text><Text style={{ color: 'green' }}>{res.priority}</Text></Text>
                  <Text><Text style={{ color: 'black' }}>Follow Up: </Text><Text style={{ color: 'green' }}>{res.follow_up}</Text></Text>
                </View>
              ))}
            </View>
          );
        })}


      </ScrollView>

      {/* If no data is available */}

    </View>
  );
};



export default DaysummaryScreen