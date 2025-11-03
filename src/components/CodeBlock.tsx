import React, { useState, useEffect } from 'react';

// Declare a global variable for pyodide
declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
    pyodide: any;
  }
}

const CodeBlock: React.FC = () => {
  const [code, setCode] = useState<string>('print("Hello, Quant World!")');
  const [output, setOutput] = useState<string>('');
  const [pyodide, setPyodide] = useState<any>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      const pyodideInstance = await window.loadPyodide();
      window.pyodide = pyodideInstance;
      setPyodide(pyodideInstance);
    };
    if (window.loadPyodide) {
      loadPyodide();
    }
  }, []);

  const runCode = async () => {
    if (pyodide) {
      try {
        const result = await pyodide.runPythonAsync(code);
        setOutput(result || '');
      } catch (error) {
        setOutput(String(error));
      }
    }
  };

  return (
    <div className="my-4">
      <h3 className="text-xl font-semibold mb-2">Interactive Code Block</h3>
      <textarea
        className="w-full h-40 p-2 border rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        onClick={runCode}
        disabled={!pyodide}
      >
        {pyodide ? 'Run Code' : 'Loading Pyodide...'}
      </button>
      <pre className="bg-gray-100 p-2 mt-2 rounded">
        <code>{output}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
