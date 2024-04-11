import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ItemsPage } from './components/ItemsPage';
import { Pages } from './components/Pages/Index';
import { PagesControls } from './components/PagesControls';
import { HeaderControls } from './components/HeaderControls';
import { SortSettings } from './components/SortSettings';

function App() {
  return (
   <div className='fixed left-0 top-0 w-full h-full overflow-hidden bg-slate-100 text-neutral-900 p-2'>
      <div className='flex bg-white ring-1 ring-black ring-opacity-5 p-2 flex-col w-full mx-auto max-w-6xl h-full rounded-md overflow-hidden'>
        <HeaderControls/>
        <div className='p-1'>
          <SortSettings/>
        </div>
          <div className='grid grid-cols-4 gap-10 bg-neutral-200 p-3 text-neutral-900 font-semibold rounded-md m-1'>
            <div>Название</div>
            <div>Единицы измерения</div>
            <div>Артикул/код</div>
            <div></div>
          </div>
          <ItemsPage/>
          <PagesControls/>
      </div>
    </div>
  );
}

export default App;
