import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

// describe('Payment Service', () => {
//   const paymentAdapterMock = {
//     processPayment: jest.fn(),
//   };
//   let paymentService: PaymentService;

//   beforeEach(() => {
//     paymentService = new PaymentService(paymentAdapterMock);
//   });

//   test('should successfully process a valid payment', () => {
//     // Arrange
//     //TODO: Create paymentDetails object initialized with fake data

//     //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
//     //TODO: Mock processPayment implementation
//     // Act
//     //const result = paymentService.makePayment(paymentDetails);
//     // Assert
//     // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
//     // Check that processPayment inside makePayment has been called with paymentDetails
//   });

//   test('should throw an error for payment failure', () => {
//     // Arrange
//     //TODO: Create paymentDetails object initialized with fake data
//     //TODO: Create mockProcessPaymentResponse object containing failure status
//     //TODO: Mock processPayment implementation
//     // Act & Assert
//     //expect(() => paymentService.makePayment(paymentDetails)).toThrow('Payment failed');
//   });

//   test('should throw an error for invalid payment amount', () => {
//     // Arrange
//     //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
//     // Act & Assert
//     //expect(() => paymentService.makePayment(paymentDetails)).toThrow('Invalid payment amount');
//   });
// });
  


describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    // Arrange
    const paymentDetails: PaymentDetails = {
      amount: 100,
      method: PaymentMethod.CreditCard,
      cardNumber: '4111111111111111',
      currency: 'USD',
    };
    const mockProcessPaymentResponse = {
      status: 'success',
      transactionId: 'fakeTransactionId123',
    };
    
    paymentAdapterMock.processPayment.mockReturnValue(mockProcessPaymentResponse);

    // Act
    const result = paymentService.makePayment(paymentDetails);

    // Assert
    expect(result).toEqual('Payment successful. Transaction ID: fakeTransactionId123');
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(paymentDetails);
  });

  test('should throw an error for payment failure', () => {
    // Arrange
    const paymentDetails: PaymentDetails = {
      amount: 100,
      method: PaymentMethod.PayPal,
      cardNumber: '4111111111111111',
      currency: 'USD',
    };
    const mockProcessPaymentResponse = {
      status: 'failure',
      transactionId: 'fakeTransactionId123',
    };
    
    paymentAdapterMock.processPayment.mockReturnValue(mockProcessPaymentResponse);

    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange
    const paymentDetails: PaymentDetails = {
      amount: -100,
      method: PaymentMethod.CreditCard,
      cardNumber: '4111111111111111',
      currency: 'USD',
    };

    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Invalid payment amount');
  });
});
