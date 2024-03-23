import { useState } from 'react';
import Header from './components/Header';
import Difference from './components/Difference';
import About from './components/About';
import { Factor, generateFactorValues } from './utils/utils';

function App() {
  const [factor, setFactor] = useState<Factor>([30, 50]);

  const [baseValue, setBaseValue] = useState(16);

  // for clipboard
  const [selected, setSelected] = useState();

  console.log(generateFactorValues(factor, 16));

  return (
    <div className="p-[1rem] max-w-[520px] sm:p-0 mx-auto sm:py-[4rem]">
      <Header />
      {/* idea: show graph in large screens */}
      {/* idea: add way to change base value */}
      <main className="flex flex-col gap-[2rem]">
        <div className="flex flex-col sm:flex-row">
          <h2 className="min-w-[8rem] text-secondary-text mb-[0.5rem]">
            Factor
          </h2>
          <ul>
            <li>30 - 50</li>
          </ul>
        </div>

        <Difference />

        <div className="flex flex-col sm:flex-row">
          <h2 className="min-w-[8rem] text-secondary-text mb-[0.5rem]">
            Values
          </h2>
          <ul className="flex w-full max-w-[20rem] flex-col">
            <div className="flex gap-[1rem]">
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                4
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                8
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                16
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                24
              </li>
            </div>
            <div className="flex gap-[1rem]">
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                42
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                811
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                162
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                244
              </li>
            </div>
            <div className="flex gap-[1rem]">
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                442
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                834
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                1632
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                242
              </li>
            </div>
            <div className="flex gap-[1rem]">
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                4234
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                8323
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                1643
              </li>
              <li className="w-full text-center py-[0.5rem] hover:bg-primary-color-500 rounded-inner cursor-pointer">
                2421
              </li>
            </div>
          </ul>
        </div>

        <About />
      </main>
    </div>
  );
}

export default App;
