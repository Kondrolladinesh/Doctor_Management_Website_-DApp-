import { useState } from "react";
import styled from "styled-components";
import { FaRupeeSign } from "react-icons/fa";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactModal from "react-modal";
import { Button } from "@mui/material";


const Bill = ({ showBill, handleBillClose }) => {
  const [fees, setFees] = useState([
    { feeType: "", feeAmount: "0.00" }
  ]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentType, setPaymentType] = useState("");

  const handleAddFee = () => {
    setFees([...fees, { feeType: "", feeAmount: "" }]);
};

const handleFeeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...fees];
    list[index][name] = value;
    setFees(list);

     if (name === "feeAmount" && value === "") {
       const newTotalAmount =
         calculateTotal() - parseFloat(fees[index].feeAmount);
       setTotalAmount(newTotalAmount.toFixed(2));
     }
};
    const handleDeleteFee = (index) => {
      const list = [...fees];
      list.splice(index, 1);
      setFees(list);

      // Update the totalAmount
      const newTotalAmount = calculateTotal();
      setTotalAmount(newTotalAmount.toFixed(2));
    };
     const handlePaymentTypeChange = (e) => {
       setPaymentType(e.target.value);
     };
    const handleAddVitals = (e) => {
        e.preventDefault();
        const billData = {
          fees: fees,
          totalAmount: calculateTotal(),
          paymentType: paymentType,
        };
        console.log(billData);
       
    };
    // const feesData = fees.map((fee) => ({
    //   type: fee.feeType,
    //   amount: parseFloat(fee.feeAmount),
    // }));

    const calculateTotal = () => {
      return fees.reduce(
        (total, fee) => total + parseFloat(fee.feeAmount || 0),
        0
      );
    };
  return (
    <BillBox
      isOpen={showBill}
      onRequestClose={handleBillClose}
      contentLabel="Add Patient Vitals"
    >
      <BillWrapper onSubmit={(e) => handleAddVitals(e)}>
        <Close onClick={handleBillClose}>
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back
        </Close>
        {fees.map((fee, index) => (
          <FeeWrapper key={index}>
            <SelectInput
              name="feeType"
              value={fee.feeType}
              onChange={(e) => handleFeeChange(e, index)}
            >
              <option value="">Select Fee Type</option>
              <option value="consultation">Consultation</option>
              <option value="labTest">Lab Test</option>
              <option value="xray">X-ray</option>
            </SelectInput>
            <AmountInput
              name="feeAmount"
              value={fee.feeAmount}
              onChange={(e) => handleFeeChange(e, index)}
              type="number"
              step="0.01"
              placeholder="Amount"
            />
            <RupeeIcon />
            {index === fees.length - 1 ? (
              <AddMore onClick={handleAddFee}>+</AddMore>
            ) : (
              <DeleteFee onClick={() => handleDeleteFee(index)}>-</DeleteFee>
            )}
          </FeeWrapper>
        ))}
        <BillTotal>Total: {calculateTotal().toFixed(2)}</BillTotal>
        <PaymentSelect value={paymentType} onChange={handlePaymentTypeChange}>
          <option value="">Select Payment Method</option>
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
          <option value="creditCard">Credit Card</option>
          <option value="debitCard">Debit Card</option>
          <option value="netBanking">Net Banking</option>
        </PaymentSelect>
        <br></br>
        <Button type="submit">Submit</Button>
      </BillWrapper>
    </BillBox>
  );
};

const BillBox = styled(ReactModal)`
  display: block;
  flex-direction: column;
  outline: none;
  background-color: #fff;
  border: 1px solid black;
  z-index: 9999;
  /* width: 100%; */
  max-width: 500px;
  height: auto;
  border-radius: 10px;
  padding: 10px 10px;
  margin: auto;
  transform: translateY(40%);
`;
const BillWrapper = styled.form`
  display: block;
  /* grid-template-columns: repeat(3, 2fr); */
  /* grid-gap: 20px; */
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const FeeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 20px;
`;
const Close = styled.div`
  background-color: transparent;
  outline: none;
  border: none;
  margin-bottom: 5px;
  cursor: pointer;
  margin: 0px 0px 0px 10px;
`;

const SelectInput = styled.select`
  flex: 1;
  margin-right: 10px;
  padding: 5px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

const AmountInput = styled.input`
  width: 100px;
  padding: 5px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

const RupeeIcon = styled(FaRupeeSign)`
  margin-left: -25px;
`;

const AddMore = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
`;
const DeleteFee = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: red;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
`;
const PaymentSelect = styled.select`
  font-size: 15px;
  border-radius: 5px;
  max-width: 150px;
  padding: 5px;
  background-color: #fff;
`;

const BillTotal = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;
export default Bill;