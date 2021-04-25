import { default as React, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../store/GlobalContext';


function ChartPage() {
  const [, , api] = useContext(GlobalContext);
  const [, setData] = useState({});
  const [, setFormStatus] = useState(null);

  return (
    <>
      Chart Page
    </>
  );
}

export default ChartPage;
