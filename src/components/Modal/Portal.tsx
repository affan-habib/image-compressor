import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export function Portal({ children }: PortalProps) {
  const portalRoot = useRef(document.createElement('div'));

  useEffect(() => {
    const root = portalRoot.current;
    document.body.appendChild(root);
    return () => {
      document.body.removeChild(root);
    };
  }, []);

  return createPortal(children, portalRoot.current);
}