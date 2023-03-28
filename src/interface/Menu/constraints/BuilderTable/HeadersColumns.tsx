import React from 'react';

interface HeadersColumnsProps<T> {
    content: Array<T>,
    elementToString: (element: T) => string
}

function HeadersColumns<T>({content, elementToString}: HeadersColumnsProps<T>) {
    return (
        <>
            {
                content.map((el, index) => (
                    <td
                        key={index}
                        className="titled-cell"
                    >
                        {elementToString(el)}
                    </td>
                ))
            }
        </>
    );
}

export default HeadersColumns;