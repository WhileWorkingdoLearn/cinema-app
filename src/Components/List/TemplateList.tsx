import { ReactNode } from "react";


function TemplateList<T extends {}>(
    { items, renderItem  }: {
    items: T[],
    renderItem: (item: T) => ReactNode; 
  }){

    return (<>
    <ul style={{listStyleType: 'none'}}>
        {items.map((item, i) => (
            <li key={i}>{renderItem(item)}</li>
        ))}
    </ul>
    </>);
}

export default TemplateList;