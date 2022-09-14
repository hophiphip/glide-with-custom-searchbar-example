import '@glideapps/glide-data-grid/dist/index.css';
import '../styles/App.css'

import { DataEditor, DataEditorProps, GridCellKind, GridColumn } from '@glideapps/glide-data-grid';
import { useCallback, useMemo } from 'react';

function App() {
  const getData = useCallback<DataEditorProps["getCellContent"]>(
    cell => ({
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: true,
        data: `${cell[0]},${cell[1]}-data`,
        displayData: `${cell[0]},${cell[1]} Some Text`,
    }),
    []
  );
  
  const cols = useMemo<GridColumn[]>(
    () => [
        {
            width: 100,
            title: "A",
        },
        {
            width: 100,
            title: "B",
        },
        {
            width: 100,
            title: "C",
        },
    ],
    []
  );

  return (
    <div className="app">
      <DataEditor 
          width={800} 
          height={500} 
          getCellContent={getData} 
          columns={cols} 
          rows={1000} 
          keybindings={{search: true}} 
          getCellsForSelection={true}
        />
    </div>
  )
}

export default App
