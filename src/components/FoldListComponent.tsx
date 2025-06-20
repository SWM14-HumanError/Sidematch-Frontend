import React, {useState} from 'react';
import RightArrow from './svgs/RightArrow.tsx';

interface IFoldListComponent {
  title: string;
  children?: React.ReactNode;
}
function FoldListComponent({title, children}: IFoldListComponent) {
  const [isFold, setIsFold] = useState<boolean>(true);

  return (
    <li>
      <button className='fold_action'
              role="tablist"
              aria-label={isFold ? `${title} 접기` : `${title} 펼치기`}
              onClick={() => setIsFold(prev => !prev)}>
        <h2>{title}</h2>

        <RightArrow width={8} height={16} rotate={isFold ? 0 : 90}/>
      </button>

      { !isFold && (
        <div className='fold_content_layout'>
          {children}
          <br/>
          <br/>
        </div>
      )}
    </li>
  );
}

export default FoldListComponent;