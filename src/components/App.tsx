import '@glideapps/glide-data-grid/dist/index.css';
import '../styles/App.css'

import { DataEditor, DataEditorProps, GridCellKind, GridColumn } from '@glideapps/glide-data-grid';
import type { DataGridSearchLabels } from '@glideapps/glide-data-grid/dist/ts/data-grid-search/data-grid-search';

import { useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import i18next, { changeLanguage, Language, languageNames } from '../i18n/i18next';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const { t } = useTranslation('translation', { i18n: i18next });

  const onLanguageChange = (evt: SelectChangeEvent) => {
    const lang = evt.target.value as Language;

    setSelectedLanguage(lang);
    changeLanguage(lang)
  };

  const columns = useMemo<GridColumn[]>(
    () => [
        { width: 100, title: t('columns.one') },
        { width: 100, title: t('columns.two') },
        { width: 100, title: t('columns.three') },
    ],
    [selectedLanguage]
  );

  const getCell = useCallback<DataEditorProps["getCellContent"]>(
    cell => ({
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: true,
        data: `${cell[0]},${cell[1]}`,
        displayData: `${cell[0]},${cell[1]}`,
    }),
    []
  );

  const LanguageOptions = useMemo(() => (
      Object.entries(languageNames).map(([key, name]) => (
        <MenuItem key={`$${key}-${name}`} value={key}>{name}</MenuItem>
      )) 
    ), [languageNames]);

  return (
    <div className="app">
      <Box sx={{ minWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id='lang-select-label'>{t('select.label')}</InputLabel>
          <Select
            id='lang-select'
            value={selectedLanguage}
            label={t('select.label')}
            labelId='lang-select-label'
            onChange={onLanguageChange}>
              {LanguageOptions}
          </Select>
        </FormControl>
      </Box>

      <DataEditor 
        width={800} 
        height={500} 
        rows={1000} 
        columns={columns} 
        getCellContent={getCell} 
        getCellsForSelection={true}
        keybindings={{search: true}} 

        searchLabels={{
          hint: () => t('search.hint'),
          next: () => t('search.next'),
          previous: () => t('search.prev'),
          close: () => t('search.close'),
        }}
      />
    </div>
  )
}

export default App
