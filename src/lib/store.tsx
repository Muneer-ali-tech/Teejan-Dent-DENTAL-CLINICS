import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BookingPrefill = {
  branch?: string;
  department?: string;
  doctor?: string;
};

type Ctx = {
  bookingOpen: boolean;
  prefill: BookingPrefill;
  openBooking: (p?: BookingPrefill) => void;
  closeBooking: () => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
  /** True while the mobile offer ribbon is on screen (affects floating widgets). */
  offerRibbon: boolean;
  setOfferRibbon: (v: boolean) => void;
};

const UICtx = createContext<Ctx | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});
  const [chatOpen, setChatOpen] = useState(false);
  const [offerRibbon, setOfferRibbon] = useState(false);

  const openBooking = useCallback((p?: BookingPrefill) => {
    setPrefill(p ?? {});
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const value = useMemo(
    () => ({
      bookingOpen,
      prefill,
      openBooking,
      closeBooking,
      chatOpen,
      setChatOpen,
      offerRibbon,
      setOfferRibbon,
    }),
    [bookingOpen, prefill, openBooking, closeBooking, chatOpen, offerRibbon],
  );

  return <UICtx.Provider value={value}>{children}</UICtx.Provider>;
}

export function useUI() {
  const ctx = useContext(UICtx);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
