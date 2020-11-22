import React from 'react';
import { Pie } from 'react-chartjs-2';
function PieChartComponent(props) {
    const dataCat = props.dataParentToChild.map((data2) => { return data2.category })
    const dataTot = props.dataParentToChild.map((data2) => { return data2.total })
	
    return (
                <Pie
                    data = {{
                        labels:dataCat,
                        datasets :[{
                            label: 'Expenses',
                            data:dataTot,
                            backgroundColor: [
                                'rgb(120,28,129)',
                                'rgb(64,67,153)',
                                'rgb(72,139,194)',
                                'rgb(107,178,140)',
                                'rgb(159,190,87)',
                                'rgb(210,179,63)',
                                'rgb(231,126,49)',
                                'rgb(217,33,32)'
                            ],
                        }]
                    }}
                />
        )
}
export default PieChartComponent;