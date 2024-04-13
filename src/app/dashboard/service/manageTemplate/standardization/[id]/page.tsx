'use client';

import axiosClient from '@/lib/axiosClient';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type Props = {};

const StandardizationPage = (props: Props) => {
  const params = useParams<{ id: string }>();
  const templateRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [showButton, setShowButton] = useState(false);
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const getFile = async (id: number) => {
    // fetch file
    const res = await axiosClient.get('formTemplateVersion/download/' + id, { responseType: 'blob' });
    const file = new Blob([res.data]);

    const form = new FormData();
    form.append('file', file);

    const converterURL = process.env.NEXT_PUBLIC_CONVERTER_API;
    if (!converterURL) {
      console.error('Converter API is not defined');
      return 'Server error';
    }
    const htmlRes = await axiosClient.post(converterURL, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const html = htmlRes.data;
    return html;
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (range && !range.collapsed) {
        const rect = range.getBoundingClientRect();
        setSize({ width: rect.width, height: rect.height });
        setSelectionRange(range);
        setButtonPosition({
          left: rect.left + window.scrollX + rect.width, // Center the button above the selection
          top: rect.top + window.scrollY - 20, // Place the button 30px above the selection
        });
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
  };

  const replaceTextWithInput = (event: any) => {
    event.preventDefault();
    if (selectionRange) {
      if (selectionRange.commonAncestorContainer.nodeType != Node.TEXT_NODE) return alert('Please select the content within a sentence');

      // Create div element to wrap the input
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.minWidth = '160px';
      div.style.width = `${size.width}px`;
      div.className = 'flex-nowrap border-red-400 border-1 justify-between';

      // Create the input element
      const input = document.createElement('input');
      const widthInput = size.width > 150 ? size.width - 50 - 30 : 70;
      input.type = 'text';
      input.name = selectionRange.toString();
      input.style.height = `30px`;
      input.style.width = `${widthInput}px`;
      input.className = ``;
      // const parent = selectionRange.startContainer.parentNode;

      // Create selecter to choose type of input
      const select = document.createElement('select');
      select.name = 'type';
      select.style.height = `30px`;
      select.style.width = `50px`;
      select.className = ``;
      const option1 = document.createElement('option');
      option1.value = 'text';
      option1.text = 'Text';
      const option2 = document.createElement('option');
      option2.value = 'number';
      option2.text = 'Number';
      select.appendChild(option1);
      select.appendChild(option2);

      // Create the remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'X';
      removeButton.style.width = `30px`;
      removeButton.style.height = `30px`;
      removeButton.setAttribute('type', 'reset');
      removeButton.className = `bg-red-500 text-white`;

      // Function to replace the input with static text
      const replaceInputWithText = () => {
        const textNode = document.createTextNode(input.name);
        if (div.parentNode) {
          div.parentNode.replaceChild(textNode, div);
        }
        removeButton.parentNode && removeButton.parentNode.removeChild(removeButton); // Remove the button
      };

      // Add click event listener to the remove button
      removeButton.addEventListener('click', replaceInputWithText);

      div.appendChild(input);
      div.appendChild(select);
      div.appendChild(removeButton);

      selectionRange.deleteContents();
      selectionRange.insertNode(div);

      input.focus(); // Focus the input to encourage immediate editing

      setShowButton(false);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('submit');

    const form = event.target;
    const formData = new FormData(form);
    console.log(formData);
  };

  useEffect(() => {
    const renderPage = async (): Promise<void> => {
      const html = await getFile(Number(params.id));
      if (templateRef.current) (templateRef.current as HTMLElement).innerHTML = html;
    };
    renderPage();
  }, []);

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-semibold text-left text-black mb-4">Use Template</h1>
      <form onSubmit={handleSubmit} className="w-[795px] bg-white border-1 border-black mx-auto">
        <div className="bg-white basis-3/12 ">
          <div className="p-4">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <input
                      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="Tên biểu mẫu"
                      type="text"
                      name="formName"
                    />
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button type="submit" className="bg-primary text-white px-4 py-2 ml-3 rounded-md text-sm font-medium" aria-label="Download">
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <Input className="m-2 w-40" variant="bordered" label="Tên biểu mẫu" type="text" name="formName" /> */}
        </div>
        <div className="w-[793px] mx-auto">
          <div className="overflow-y-scroll max-h-[39rem] min-h-[39rem]  border-2">
            <div className="relative content-center min-h-[35rem] p-10 border-1 border-black" onMouseUp={handleTextSelection} ref={templateRef}></div>
            {showButton && (
              <button
                onClick={replaceTextWithInput}
                className="absolute translate-x-1/2 text-white bg-red-400 w-6 h-6 rounded-full text-center"
                style={{
                  left: `${buttonPosition.left}px`,
                  top: `${buttonPosition.top}px`,
                }}
              >
                +
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default StandardizationPage;
