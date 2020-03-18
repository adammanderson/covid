/** @jsx jsx */
import * as React from 'react';
import { jsx, Button, Heading } from 'theme-ui';
import { Card } from '../Card';
import { ModalProps } from '.';

const Modal: React.SFC<ModalProps> = ({
  isOpen = false,
  children,
}) => {
  const [open, setOpen] = React.useState(isOpen);

  return (
    <div>
      { open && (
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 1001,
          }}
        >
          <Card
            fixed
            sx={{
              flex: '0 1 600px',
              maxWidth: 600,
            }}
          >
            <div
              sx={{
                p: 4,
              }}
            >
              {children}
              <Button
                onClick={() => setOpen(!open)}
                sx={{ mt: 3 }}
              >
                  Dismiss
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Modal;
