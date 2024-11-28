'use client';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface InputFieldProps {
  control: any;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  disabled: boolean;
}

export function InputField(props: InputFieldProps): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className={props.type === 'password' ? 'pr-8' : ''}
                type={props.type === 'password' && showPassword ? 'text' : props.type}
                placeholder={props.placeholder}
                disabled={props.disabled}
                {...field}
              />
              {props.type === 'password' && (
                <Button
                  className="absolute right-0 top-0 hover:bg-transparent"
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={props.disabled}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}