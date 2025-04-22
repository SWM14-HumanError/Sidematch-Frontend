import React, {useCallback, useEffect, useState} from 'react';
import LoadingComponent from '@components/LoadingComponent.tsx';
import '@styles/components/DialogTemplate.scss';

interface IDialogTemplate {
  isLoading?: boolean;
  isOpen?: boolean;
  setIsOpen: (_: boolean) => void;
  children: React.ReactNode;
}

function DialogTemplate({isOpen=true, setIsOpen, isLoading=false, children}: IDialogTemplate) {
  const [overflow, setOverflow] = useState<string>('auto');

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setOverflow(document.body.style.overflow ?? 'auto');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = overflow;
    }

    return () => {
      document.body.style.overflow = overflow;
    }
  }, [isOpen]);

  return !isOpen ? null : (
    <div className='dialog_background'
         onClick={closeDialog}>
      <div className={isLoading ? 'dialog loading' : 'dialog'} role='dialog' aria-modal='true'
           onClick={e => e.stopPropagation()}>
        {isLoading ? (
          <LoadingComponent/>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>

  )
}

export default DialogTemplate;