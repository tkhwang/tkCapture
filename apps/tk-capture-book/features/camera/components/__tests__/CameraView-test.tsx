import React from 'react'; 
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { CameraView } from '../CameraView'; 

// Mock expo-font
jest.mock('expo-font', () => ({
  loadAsync: jest.fn().mockResolvedValue(undefined),
  isLoaded: jest.fn().mockReturnValue(true), 
}));

// Mock @expo/vector-icons (specifically Ionicons)
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons'); 

// Targeted mock for expo-camera
jest.mock('expo-camera', () => {
  const ActualReact = require('react'); 
  const ActualReactNative = require('react-native'); 

  // This is a simple functional component mock for <CameraView />
  // It is NOT a jest.fn() itself.
  const MockExpoCameraComponent = ActualReact.forwardRef(
    ({ children, testID, facing }: any, ref: any) => (
      <ActualReactNative.View testID={testID || "mock-expo-camera-view"} ref={ref}>
        {children}
        <ActualReactNative.Text testID="mock-facing-prop">{facing}</ActualReactNative.Text>
      </ActualReactNative.View>
    )
  );

  // Attach static methods as jest.fn() to the component mock
  (MockExpoCameraComponent as any).onModernBarcodeScanned = jest.fn(() => ({ remove: jest.fn() }));

  return {
    CameraType: { 
      back: 'back', 
      front: 'front' 
    },
    CameraView: MockExpoCameraComponent, 
  };
});


describe('CameraView', () => {
  const mockOnFlipCamera = jest.fn();
  const mockOnPictureTaken = jest.fn();
  const mockOnBarcodeScanned = jest.fn();

  // This will now point to the simple component mock, not a jest.fn()
  let MockedExpoCameraView: any; 

  beforeEach(() => {
    jest.clearAllMocks(); 
    
    MockedExpoCameraView = require('expo-camera').CameraView;
    // Reset the static mock method before each test
    (MockedExpoCameraView.onModernBarcodeScanned as jest.Mock).mockClear().mockReturnValue({ remove: jest.fn() });
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  it('renders the mocked ExpoCameraView component with correct props', () => {
    render(
      <CameraView
        facing="back"
        onFlipCamera={mockOnFlipCamera}
        onPictureTaken={mockOnPictureTaken}
        onBarcodeScanned={mockOnBarcodeScanned}
      />
    );
    // Assert that the mock component was rendered by checking for its testID
    expect(screen.getByTestId('mock-expo-camera-view')).toBeTruthy();
    // Check if the prop was passed correctly by inspecting the rendered output of the mock
    expect(screen.getByTestId('mock-facing-prop').props.children).toBe('back');
  });

  it('renders flip camera and take picture buttons and calls callbacks', async () => {
    const mockTakePictureAsync = jest.fn().mockResolvedValue({ uri: 'test-uri' });
    const mockCameraRefInstance = { takePictureAsync: mockTakePictureAsync };
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: mockCameraRefInstance });

    const { getByTestId } = render(
      <CameraView
        facing="back"
        onFlipCamera={mockOnFlipCamera}
        onPictureTaken={mockOnPictureTaken}
        onBarcodeScanned={mockOnBarcodeScanned}
      />
    );

    const flipButton = getByTestId('flip-camera-button');
    const pictureButton = getByTestId('take-picture-button');

    expect(flipButton).toBeTruthy();
    expect(pictureButton).toBeTruthy();

    fireEvent.press(flipButton);
    expect(mockOnFlipCamera).toHaveBeenCalledTimes(1);

    fireEvent.press(pictureButton);
    expect(mockTakePictureAsync).toHaveBeenCalledTimes(1); 

    await waitFor(() => {
      expect(mockOnPictureTaken).toHaveBeenCalledWith('test-uri');
    });
    expect(mockOnPictureTaken).toHaveBeenCalledTimes(1);

    useRefSpy.mockRestore(); 
  });

  it('registers and unregisters barcode scanner listener using onModernBarcodeScanned', () => {
    const mockRemoveSubscription = jest.fn();
    (MockedExpoCameraView.onModernBarcodeScanned as jest.Mock).mockReturnValue({ remove: mockRemoveSubscription });

    const { unmount } = render(
      <CameraView
        facing="back"
        onFlipCamera={mockOnFlipCamera}
        onPictureTaken={mockOnPictureTaken}
        onBarcodeScanned={mockOnBarcodeScanned}
      />
    );

    expect(MockedExpoCameraView.onModernBarcodeScanned).toHaveBeenCalledTimes(1);
    expect(MockedExpoCameraView.onModernBarcodeScanned).toHaveBeenCalledWith(expect.any(Function));

    unmount();
    expect(mockRemoveSubscription).toHaveBeenCalledTimes(1);
  });

  it('calls onBarcodeScanned with correct data when a valid barcode is scanned via onModernBarcodeScanned callback', () => {
    const mockScanData = '1234567890123';
    const mockEventType = 'ean13'; 
    
    let barcodeScanCallback: (event: { type: string; data: string }) => void = () => {};
    (MockedExpoCameraView.onModernBarcodeScanned as jest.Mock).mockImplementation((callback) => {
      barcodeScanCallback = callback; 
      return { remove: jest.fn() }; 
    });

    render(
      <CameraView
        facing="back"
        onFlipCamera={mockOnFlipCamera}
        onPictureTaken={mockOnPictureTaken}
        onBarcodeScanned={mockOnBarcodeScanned}
      />
    );

    barcodeScanCallback({ type: mockEventType, data: mockScanData });
    expect(mockOnBarcodeScanned).toHaveBeenCalledWith(mockScanData);
    expect(mockOnBarcodeScanned).toHaveBeenCalledTimes(1);

    barcodeScanCallback({ type: 'isbn', data: '9876543210987' });
    expect(mockOnBarcodeScanned).toHaveBeenCalledWith('9876543210987');
    expect(mockOnBarcodeScanned).toHaveBeenCalledTimes(2);

    barcodeScanCallback({ type: 'qr', data: 'otherdata' });
    expect(mockOnBarcodeScanned).toHaveBeenCalledTimes(2); 
  });
});
