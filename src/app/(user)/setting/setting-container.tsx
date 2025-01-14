'use client';

import React, { useState } from 'react';

import {
  ArrowBigDownIcon,
  CurrencyIcon,
  LanguagesIcon,
  SunIcon,
} from 'lucide-react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function SettingContainer() {
  const frameworks = [
    {
      value: 'Dark',
      label: 'Dark',
    },
    {
      value: 'Light',
      label: 'Light',
    },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Dark');
  return (
    <div className="mb-[76px] mt-4 flex justify-center px-2 sm:mb-0">
      <div className="ls:w-1/2 flex h-full w-full flex-col p-1 pb-10 pt-2.5 sm:w-3/4 sm:p-6 ">
        <div className="flex flex-row items-center gap-x-4 text-[28px] font-bold leading-10">
          <h3 className="p-0 text-2xl font-semibold">Settings</h3>
        </div>
        <div className="flex h-full flex-col p-6">
          <div
            data-orientation="horizontal"
            role="none"
            className="h-[1px] w-full shrink-0 bg-border"
          ></div>
          <div className="flex items-center py-6 font-semibold leading-none tracking-tighter">
            <span className="mr-6">
              <SunIcon></SunIcon>
            </span>
            <p>Theme</p>
            <div className="ml-auto">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? '' : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                value === framework.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* seecond */}
          <div
            data-orientation="horizontal"
            role="none"
            className="h-[1px] w-full shrink-0 bg-border"
          ></div>
          <div className="flex items-center py-6 font-semibold leading-none tracking-tighter">
            <span className="mr-6">
              <LanguagesIcon></LanguagesIcon>
            </span>
            <p>Language</p>
            <div className="ml-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    English
                    <ArrowBigDownIcon className="opacity-50" />
                  </Button>
                </PopoverTrigger>
              </Popover>
            </div>
          </div>

          {/* third */}

          <div
            data-orientation="horizontal"
            role="none"
            className="h-[1px] w-full shrink-0 bg-border"
          ></div>
          <div className="flex items-center py-6 font-semibold leading-none tracking-tighter">
            <span className="mr-6">
              <CurrencyIcon></CurrencyIcon>
            </span>
            <p>Currency</p>
            <div className="ml-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    US Dollar
                    <ArrowBigDownIcon className="opacity-50" />
                  </Button>
                </PopoverTrigger>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
