import { IconButton, Input } from "@chakra-ui/react";
import { ChangeEvent, useRef } from "react";

interface FileUploadProps {
  icon: React.ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ariaLabel: string;
  accept?: string;
}

export const FileUpload = ({
  icon,
  onChange,
  accept,
  ariaLabel,
}: FileUploadProps) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <IconButton
        icon={icon}
        aria-label={ariaLabel}
        size="xs"
        onClick={() => {
          ref.current && ref.current.click();
        }}
      />
      <Input
        type="file"
        display={"none"}
        onChange={onChange}
        multiple
        accept={accept}
        ref={ref}
      />
    </div>
  );
};
