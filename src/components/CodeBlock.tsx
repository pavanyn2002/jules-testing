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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
        });
        window.pyodide = pyodideInstance;
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
        setOutput("Failed to load the interactive environment.");
      } finally {
        setIsLoading(false);
      }
    };
    if (window.loadPyodide) {
      loadPyodide();
    } else {
        setOutput("Pyodide script not found. Please check your internet connection or browser settings.");
        setIsLoading(false);
    }
  }, []);

  const runCode = async () => {
    if (pyodide) {
      try {
        // Redirect stdout to capture print statements
        pyodide.globals.set("stdout_callback", (s: string) => setOutput(prev => prev + s + '\\n'));
        const result = await pyodide.runPythonAsync(`
          import sys
          import io
          sys.stdout = io.StringIO()
          ${code}
          sys.stdout.getvalue()
        `);
        setOutput(result || '');
      } catch (error) {
        setOutput(String(error));
      }
    }
  };

  return (
    <div className="my-8 p-6 border border-noir-border rounded-lg">
      <h3 className="text-3xl font-semibold text-noir-accent mb-4">Interactive Code Block</h3>
      <textarea
        className="w-full h-48 p-4 border border-noir-border rounded bg-gray-900 text-noir-text font-mono text-sm focus:ring-2 focus:ring-noir-accent focus:outline-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your Python code here..."
      />
      <button
        className="bg-noir-accent text-noir-bg font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-opacity-80 disabled:bg-gray-500 disabled:cursor-not-allowed mt-4"
        onClick={runCode}
        disabled={isLoading || !pyodide}
      >
        {isLoading ? 'Loading Environment...' : 'Run Code'}
      </button>
      <pre className="bg-gray-900 text-noir-text p-4 mt-4 rounded border border-noir-border whitespace-pre-wrap">
        <code>{output || '// Output will be displayed here'}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
