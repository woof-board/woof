import React, { useState } from 'react';

function PaymentScreen() {
  const [card, setCard] = useState(null);
  // ...

  const { confirmSetupIntent, loading } = useConfirmSetupIntent();

  // ...

  const handlePayPress = async () => {
    // Gather the customer's billing information (e.g., email)
    const billingDetails = {
      email: 'jenny.rosen@example.com',
    };
    // Create a setup intent on the backend
    const clientSecret = await createSetupIntentOnBackend();
    const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
      type: 'Card',
      billingDetails,
    });

    if (error) {
      //Handle the error
    }
    // ...
  }
  
  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCard(cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
      <Button onPress={handlePayPress} title="Save" loading={loading} />
    </View>
  );
}

export default PaymentScreen;