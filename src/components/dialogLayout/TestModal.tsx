import {useState} from "react";
import DialogTemplate from "@components/dialogLayout/DialogTemplate.tsx";

export default function TestModal() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={false}>
      <div className='dialog_content'>
        <h1>Test Modal</h1>
        <p>This is a test modal.</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </DialogTemplate>
  );
}