import React, { createContext, useContext, useRef, useState } from 'react';
import BottomSheet, { BottomSheetRefProps } from '@/components/BottomSheet';
import { Dimensions } from 'react-native';

type BottomSheetContextType = {
  openBottomSheet: (content: React.ReactNode) => void;
  closeBottomSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  const [content, setContent] = useState<React.ReactNode>(null);
  const bottomSheetRef = useRef<BottomSheetRefProps | null>(null);

  const openBottomSheet = (content: React.ReactNode) => {
    setContent(content);
    bottomSheetRef.current?.scrollTo(-SCREEN_HEIGHT * 0.4);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.scrollTo(0); 
    setContent(null);
  };

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
      <BottomSheet ref={bottomSheetRef}>{content}</BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};