import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CategoryChart({ categoryData = [] }) {
    // 1. If there is no data, show a friendly message
    if (!categoryData || categoryData.length === 0) {
        return (
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body items-center text-center py-10">
                    <h2 className="text-base-content/60 font-bold uppercase tracking-widest">Expense Breakdown</h2>
                    <p className="text-sm opacity-70 mt-2">Add some expenses to see your chart!</p>
                </div>
            </div>
        );
    }

    // 2. Format the data (Convert negative amounts to positive for the pie chart)
    const formattedData = categoryData.map(item => ({
        name: item._id || 'Uncategorized', // Handle cases where category might be missing
        value: Math.abs(item.totalAmount) 
    }));

    // Professional color palette
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
                <h2 className="card-title text-sm font-bold uppercase tracking-widest text-base-content/60 mb-2">
                    Expense Breakdown
                </h2>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={formattedData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="name"
                            >
                                {formattedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default CategoryChart;