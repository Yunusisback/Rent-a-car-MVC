import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Navbar } from '../components/Navbar';

// Mock AppContext
const mockChangeLanguage = vi.fn();
const mockAppContext = {
  language: 'tr',
  changeLanguage: mockChangeLanguage,
};

vi.mock('../context/AppContext', () => ({
  useApp: () => mockAppContext,
}));

// Mock translations
vi.mock('../utils/translations', () => ({
  useTranslation: (lang) => ({
    title: lang === 'tr' ? 'Araç Kiralama' : 'Car Rental',
    language: lang === 'tr' ? 'Dil' : 'Language',
  }),
}));

// Mock lucide- rreact icons
vi.mock('lucide-react', () => ({
  Globe: () => <div data-testid="globe-icon">Globe</div>,
  User: () => <div data-testid="user-icon">User</div>,
  HelpCircle: () => <div data-testid="help-icon">Help</div>,
  Car: () => <div data-testid="car-icon">Car</div>,
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('navbar başarıyla render olmalı', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeDefined();
    });

    it('logo ve başlık görünmeli', () => {
      render(<Navbar />);
      expect(screen.getByText('Araç Kiralama')).toBeDefined();
      expect(screen.getByTestId('car-icon')).toBeDefined();
    });

    it('tüm ana butonlar render olmalı', () => {
      render(<Navbar />);
      
      // Help butonu
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      // İkonlar
      expect(screen.getByTestId('help-icon')).toBeDefined();
      expect(screen.getByTestId('globe-icon')).toBeDefined();
      expect(screen.getByTestId('user-icon')).toBeDefined();
    });

    it('dropdown menüler başlangıçta kapalı olmalı', () => {
      render(<Navbar />);
      
      expect(screen.queryByText('SSS')).toBeNull();
      expect(screen.queryByText('Türkçe')).toBeNull();
      expect(screen.queryByText('Kayıt Ol')).toBeNull();
    });
  });

  describe('Help Menu', () => {
    it('help butonuna tıklayınca dropdown açılmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const helpButton = buttons.find(btn => 
        btn.querySelector('[data-testid="help-icon"]')
      );
      
      fireEvent.click(helpButton);
      
      expect(screen.getByText('SSS')).toBeDefined();
      expect(screen.getByText('İletişim')).toBeDefined();
      expect(screen.getByText('Destek')).toBeDefined();
    });

    it('help butonuna tekrar tıklayınca dropdown kapanmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const helpButton = buttons.find(btn => 
        btn.querySelector('[data-testid="help-icon"]')
      );
      
      // Aç
      fireEvent.click(helpButton);
      expect(screen.getByText('SSS')).toBeDefined();
      
      // Kapat
      fireEvent.click(helpButton);
      expect(screen.queryByText('SSS')).toBeNull();
    });

    it('help menüsü açıkken diğer menüler kapalı olmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const langButton = buttons.find(btn => 
        btn.querySelector('[data-testid="globe-icon"]')
      );
      const helpButton = buttons.find(btn => 
        btn.querySelector('[data-testid="help-icon"]')
      );
      
      // Önce dil menüsünü aç
      fireEvent.click(langButton);
      expect(screen.getByText('Türkçe')).toBeDefined();
      
      // Sonra help menüsünü aç
      fireEvent.click(helpButton);
      
      // Help açık dil kapalı olmalı
      expect(screen.getByText('SSS')).toBeDefined();
      expect(screen.queryByText('Türkçe')).toBeNull();
    });
  });

  describe('Language Menu', () => {
    it('dil butonuna tıklayınca dropdown açılmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const langButton = buttons.find(btn => 
        btn.querySelector('[data-testid="globe-icon"]')
      );
      
      fireEvent.click(langButton);
      
      expect(screen.getByText('Türkçe')).toBeDefined();
      expect(screen.getByText('English')).toBeDefined();
    });

    it('dil butonuna tekrar tıklayınca dropdown kapanmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const langButton = buttons.find(btn => 
        btn.querySelector('[data-testid="globe-icon"]')
      );
      
      // Aç
      fireEvent.click(langButton);
      expect(screen.getByText('Türkçe')).toBeDefined();
      
      // Kapat
      fireEvent.click(langButton);
      expect(screen.queryByText('Türkçe')).toBeNull();
    });

    it('dil seçilince dropdown otomatik kapanmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const langButton = buttons.find(btn => 
        btn.querySelector('[data-testid="globe-icon"]')
      );
      
      fireEvent.click(langButton);
      
      const turkishOption = screen.getByText('Türkçe');
      fireEvent.click(turkishOption);
      
      expect(screen.queryByText('English')).toBeNull();
      expect(mockChangeLanguage).toHaveBeenCalledWith('tr');
    });

    it('dil menüsü açıkken diğer menüler kapalı olmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const helpButton = buttons.find(btn => 
        btn.querySelector('[data-testid="help-icon"]')
      );
      const langButton = buttons.find(btn => 
        btn.querySelector('[data-testid="globe-icon"]')
      );
      
      // Önce help menüsünü aç
      fireEvent.click(helpButton);
      expect(screen.getByText('SSS')).toBeDefined();
      
      // Sonra dil menüsünü aç
      fireEvent.click(langButton);
      
      // Dil açık, help kapalı olmalı
      expect(screen.getByText('Türkçe')).toBeDefined();
      expect(screen.queryByText('SSS')).toBeNull();
    });
  });

  describe('User Menu', () => {
    it('kullanıcı butonuna tıklayınca dropdown açılmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const userButton = buttons.find(btn => 
        btn.querySelector('[data-testid="user-icon"]')
      );
      
      fireEvent.click(userButton);
      
      const girisButtons = screen.getAllByText('Giriş Yap');
      expect(girisButtons.length).toBe(2); // Ana buton + dropdown buton
      expect(screen.getByText('Kayıt Ol')).toBeDefined();
    });

    it('kullanıcı butonuna tekrar tıklayınca dropdown kapanmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const userButton = buttons.find(btn => 
        btn.querySelector('[data-testid="user-icon"]')
      );
      
      // Aç
      fireEvent.click(userButton);
      expect(screen.getByText('Kayıt Ol')).toBeDefined();
      
      // Kapat
      fireEvent.click(userButton);
      expect(screen.queryByText('Kayıt Ol')).toBeNull();
    });

    it('kullanıcı menüsü açıkken diğer menüler kapalı olmalı', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const helpButton = buttons.find(btn => 
        btn.querySelector('[data-testid="help-icon"]')
      );
      const userButton = buttons.find(btn => 
        btn.querySelector('[data-testid="user-icon"]')
      );
      
      // Önce help menüsünü aç
      fireEvent.click(helpButton);
      expect(screen.getByText('SSS')).toBeDefined();
      
      // Sonra kullanıcı menüsünü aç
      fireEvent.click(userButton);
      
      // User açık, help kapalı olmalı
      expect(screen.getByText('Kayıt Ol')).toBeDefined();
      expect(screen.queryByText('SSS')).toBeNull();
    });
  });

  describe('Integration', () => {
    it('tüm menüler aynı anda sadece biri açık olabilmeli', () => {
      render(<Navbar />);
      
      const buttons = screen.getAllByRole('button');
      const helpButton = buttons.find(btn => 
        btn.querySelector('[data-testid="help-icon"]')
      );
      const langButton = buttons.find(btn => 
        btn.querySelector('[data-testid="globe-icon"]')
      );
      const userButton = buttons.find(btn => 
        btn.querySelector('[data-testid="user-icon"]')
      );
      
      // Help aç
      fireEvent.click(helpButton);
      expect(screen.getByText('SSS')).toBeDefined();
      
      // Dil aç (help kapanmalı)
      fireEvent.click(langButton);
      expect(screen.queryByText('SSS')).toBeNull();
      expect(screen.getByText('Türkçe')).toBeDefined();
      
      // User aç (dil kapanmalı)
      fireEvent.click(userButton);
      expect(screen.queryByText('Türkçe')).toBeNull();
      expect(screen.getByText('Kayıt Ol')).toBeDefined();
    });
  });
});