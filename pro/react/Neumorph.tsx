import React from 'react';

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { gold?: boolean; sm?: boolean };
export const Button: React.FC<BtnProps> = ({ gold, sm, className = '', ...p }) => (
  <button className={`btn ${gold ? 'btn--gold' : ''} ${sm ? 'btn--sm' : ''} ${className}`} {...p} />
);

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...p }) => (
  <div className={`neu card ${className}`} {...p} />
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (p) => (
  <input className="field" {...p} />
);

export const Toggle: React.FC<{ on?: boolean }> = ({ on }) => (
  <div className={`toggle ${on ? 'on' : ''}`} onClick={(e) => e.currentTarget.classList.toggle('on')} />
);

export const Chip: React.FC<React.HTMLAttributes<HTMLSpanElement> & { active?: boolean }> =
  ({ active, className = '', ...p }) => <span className={`chip ${active ? 'active' : ''} ${className}`} {...p} />;

export const Slider: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (p) => (
  <input type="range" className="slider" {...p} />
);

export const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> =
  ({ open, onClose, children }) => open ? (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  ) : null;

export const Sidebar: React.FC<{ items: string[]; active?: number }> = ({ items, active = 0 }) => (
  <div className="sidebar neu">
    {items.map((it, i) => <div key={i} className={`nav-item ${i === active ? 'active' : ''}`}>{it}</div>)}
  </div>
);

export const Stepper: React.FC<{ steps: number; current: number }> = ({ steps, current }) => (
  <div className="stepper">
    {Array.from({ length: steps }).map((_, i) => (
      <React.Fragment key={i}>
        <div className={`step ${i < current ? 'done' : ''}`}>{i + 1}</div>
        {i < steps - 1 && <div className="step-line" />}
      </React.Fragment>
    ))}
  </div>
);
