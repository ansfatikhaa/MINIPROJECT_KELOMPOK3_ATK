import React, { useState, useEffect } from 'react';
import { getTotalPenjualanPerYear } from '../../service/TransaksiPenjualanService';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
    const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [todayIncome, setTodayIncome] = useState(0);
    const [yesterdayIncome, setYesterdayIncome] = useState(0);

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const response = await getTotalPenjualanPerYear(selectedYear);
                const data = response.data.data.dataPenjualanList;

                const monthlyIncome = data.map(item => ({
                    month: getMonthName(item.bulan),
                    income: item.total
                }));

                setMonthlyIncomeData(monthlyIncome);

                const incomeYesterday = response.data.data.penjualanYesterday;
                const incomeToday = response.data.data.penjualanToday;

                setYesterdayIncome(incomeYesterday);
                setTodayIncome(incomeToday);


            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        fetchIncomeData();
    }, [selectedYear]);

    useEffect(() => {
        let newChartInstance = null;
    
        const createChart = () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
    
            const ctx = document.getElementById('myAreaChart');
            if (ctx) {
                newChartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: monthlyIncomeData.map(data => data.month),
                        datasets: [{
                            label: `Pendapatan Tahun ${selectedYear}`,
                            data: monthlyIncomeData.map(data => data.income),
                            lineTension: 0.3,
                            backgroundColor: "rgba(78, 115, 223, 0.05)",
                            borderColor: "rgba(78, 115, 223, 1)",
                            pointRadius: 3,
                            pointBackgroundColor: "rgba(78, 115, 223, 1)",
                            pointBorderColor: "rgba(78, 115, 223, 1)",
                            pointHoverRadius: 3,
                            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                            pointHitRadius: 10,
                            pointBorderWidth: 2,
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        layout: {
                            padding: {
                              left: 10,
                              right: 25,
                              top: 25,
                              bottom: 0
                            }
                          },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Bulan'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Pendapatan (Rp)'
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(context.parsed.y);
                                    }
                                }
                            }
                        }
                    }
                });
            }
        };
    
        createChart();
    
        // Cleanup function to destroy chart instance when component unmounts or monthlyIncomeData changes
        return () => {
            if (newChartInstance) {
                newChartInstance.destroy();
            }
        };
    }, [monthlyIncomeData, selectedYear]);
    

    const getMonthName = (monthNumber) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[monthNumber - 1];
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-8 col-lg-8">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                            <h6 className="m-0 font-weight-bold text-primary">Grafik Pendapatan Tahun {selectedYear}</h6>
                            <select className="form-select" onChange={handleYearChange} value={selectedYear}>
                                {[...Array(10).keys()].map(i => (
                                    <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
                                ))}
                            </select>
                        </div>
                        <div className="card-body">
                            {monthlyIncomeData.length > 0 && (
                                <div className="chart-area">
                                    <canvas id="myAreaChart" key={selectedYear} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Pendapatan Hari Ini</h6>
                        </div>
                        <div className="card-body">
                            <h2>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(todayIncome)}</h2>
                        </div>
                    </div>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Pendapatan Kemarin</h6>
                        </div>
                        <div className="card-body">
                            <h2>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(yesterdayIncome)}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartComponent;
