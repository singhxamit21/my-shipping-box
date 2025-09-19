import React, { useState, useMemo } from 'react'


function CustomTable({ ...props }) {
    const { columns, data, pageSize = 5 } = props;
    const [page, setPage] = useState(1)

    const totalPages = Math.ceil(data.length / pageSize)
    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize
        return data.slice(start, start + pageSize)
    }, [data, page, pageSize])

    return (
        <div>
            <div style={{ overflowX: 'auto' }}>
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i}>{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, i) => (
                                <tr key={i}>
                                    {columns.map((col, j) => (
                                        <td key={j}>{col.accessor(row)}</td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                        Prev
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default React.memo(CustomTable)