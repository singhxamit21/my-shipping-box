import React, { useState, useMemo } from 'react'
import CustomTable from './common/CustomTable'


function BoxList({ ...props }) {
    const { boxes = [] } = props

    const columns = [
        { header: 'Receiver', accessor: (b) => b.receiver },
        { header: 'Weight (kg)', accessor: (b) => b.weight },
        {
            header: 'Box colour',
            accessor: (b) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: 28,
                            height: 20,
                            background: b.color,
                            borderRadius: 4,
                            border: '1px solid #ddd',
                        }}
                    />
                    <div style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>{b.color}</div>
                </div>
            ),
        },
        { header: 'Destination', accessor: (b) => b.country },
        { header: 'Shipping Cost (INR)', accessor: (b) => `₹ ${Number(b.cost).toFixed(2)}` },
    ]

    return (
        <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Saved Boxes</h2>
            <CustomTable columns={columns} data={boxes} pageSize={5} />
        </div>
    )
}

export default React.memo(BoxList)
