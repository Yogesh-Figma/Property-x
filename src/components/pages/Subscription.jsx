import React, { useState ,memo} from "react";
import {  Tabs } from "antd";
import "../../styles/Subscription.css";
import '../../styles/Payment.css'

const Subscription = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [billingCycle, setBillingCycle] = useState("annually");
  const [showBillingDetails , setBillingDetails] = useState(false);
  const [organizationSame, setOrganizationSame] = useState(true);
  const [autoPurchase, setAutoPurchase] = useState(false);
  
  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "annually" ? "monthly" : "annually");
  };
 
  const handleButtonClick =() =>{
    setBillingDetails(true);
  }
  const handleAutoPurchaseChange = () => {
    setAutoPurchase(!autoPurchase);
  };

  const onChange = (key) => { 
    console.log(key);
    setActiveTab(key);
  };
  console.log("Subscription rendered");
  const YourPlan = (
    <div className="subscription-container">
      <div className="plan-header">
        <img src={require('../../images/FeaturedIcon.png')}alt="icon" className="plan-icon" />
        <div className="plan-type">
          <h4 className="plan-name">Basic plan</h4>
        </div>
        <div className="upgrade-now">Upgrade Now</div>
      </div>
      <div className="plan-details">
        <div className="plan-price-container">
          <div className="plan-price">
            $10 <span>per month</span>
          </div>
          <div className="trial-info">7 Days Left</div>
        </div>
        <p className="plan-description">
          Includes up to 12 users, lead assigning, and live lead management.
        </p>
        <div className="feature-list">
          <div className="feature-item">
            <span>Members</span>
            <span className="feature-status-12">12</span>
          </div>
          <div
            className="feature-item"
            style={{ background: "rgba(249, 249, 251, 1)" }}
          >
            <span>Workspace roles</span>
            <span className="feature-status-1">Admin only</span>
          </div>
          <div className="feature-item">
            <span>Lead assigning</span>
            <span className="feature-status-1">
              <img src={require('../../images/tick.png')} alt="tick" />
            </span>
          </div>
          <div
            className="feature-item"
            style={{ background: "rgba(249, 249, 251, 1)" }}
          >
            <span>Live collaboration</span>
            <span className="feature-status-1">
              <img src={require('../../images/tick.png')} alt="tick" />
            </span>
          </div>
          <div className="feature-item">
            <span>Access to standard templates</span>
            <span className="feature-status-1">
              <img src={require('../../images/tick.png')} alt="tick" />
            </span>
          </div>
          <div
            className="feature-item"
            style={{ background: "rgba(249, 249, 251, 1)" }}
          >
            <span>Custom designed templates</span>
            <span className="feature-status-1">
              <img src={require('../../images/tick.png')} alt="tick" />
            </span>
          </div>
          <div className="feature-item">
            <span>Asset library</span>
            <span className="feature-status-1">
              <img src={require('../../images/tick.png')} alt="tick" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const Plans = (
    <div className="pricing-plans">
      <div className="top">
        <div className="">
          <div className="Pricing">Pricing</div>
          <h2>Choose Your Plan</h2>
          <p>
            Find the perfect plan for you and start enjoying exclusive benefits.
          </p>
        </div>
        <div className="billing-toggle">
          <span>Monthly</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={billingCycle === "annually"}
              onChange={toggleBillingCycle}
            />
            <span className="slider"></span>
          </label>
          <span>Annually</span>
        </div>
      </div>
      <div className="plans">
        <div className="plan">
          <h3>Basic</h3>
          <button onClick={handleButtonClick}>Choose Plan</button>
        </div>
        <div className="plan">
          <h3>Business</h3>
          <button onClick={handleButtonClick}>Choose Plan</button>
        </div>
        <div className="plan">
          <h3>Enterprise</h3>
          <button onClick={handleButtonClick}>Choose Plan</button>
        </div>
      </div>
      <h3 className="benifits">Benifits</h3>
      <div className="feature-list">
        <div className="feature-item-1">
          <span className="feature-heading">Members</span>
          <span className="feature-value-1">1</span>
          <span className="feature-value-1">Up to 3</span>
          <span className="feature-value-1">Unlimited</span>
        </div>
        <div className="feature-item-1">
          <span className="feature-heading">Workspace roles</span>
          <span className="feature-value-1">Admin only</span>
          <span className="feature-value-1">Admin only</span>
          <span className="feature-value-1">Admin & collaborator</span>
        </div>
        <div className="feature-item-1">
          <span className="feature-heading">Guests</span>
          <span className="feature-value-1"></span>
          <span className="feature-value-1"></span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
        </div>
        <div className="feature-item-1">
          <span className="feature-heading">Live collaboration</span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
        </div>
        <div className="feature-item-1">
          <span className="feature-heading">Acess to Standard templates</span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
        </div>
        <div className="feature-item-1">
          <span className="feature-heading">Custom designed templates</span>
          <span className="feature-value-1"></span>
          <span className="feature-value-1"></span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
        </div>{" "}
        <div className="feature-item-1">
          <span className="feature-heading">Asset library</span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
        </div>
        <h4 className="support">SUPPORT</h4><br/>
        <div className="feature-item-1" style={{marginTop:'20px'}}>
          <span className="feature-heading">Dedicated account Manager</span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
        </div>

        <div className="feature-item-1">
          <span className="feature-heading">Priority Support</span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
        </div>
        <div className="feature-item-1">
          <span className="feature-heading" x>Access to help center</span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
          <span className="feature-status">
            <img src={require('../../images/tick.png')} alt="tick" />
          </span>
        </div>
      </div>
    </div>
  );

  const BillingDetails=(
    <div className="checkout-container">
    {/* Left Section - Contact Information and Address */}
    <div className="checkout-form">
      <h2>Checkout</h2><br/>
      <h3>Contact Information</h3>
      <input type="email" placeholder="example@gmail.com" className="input-field" />
      
      <h3>Address</h3>
      <input type="text" placeholder="Full Name" className="input-field" />
      <input type="text" placeholder="Address" className="input-field" />
      <div className="address-row">
        <input type="text" placeholder="City" className="input-field small" />
        <input type="text" placeholder="Postal Code" className="input-field small" />
      </div>
      <input type="text" placeholder="Phone" className="input-field" />

      <div className="checkbox">
        <input type="checkbox" id="saveInfo" />
        <label htmlFor="saveInfo">Save my info for future purchases.</label>
      </div>

      <div className="checkbox">
        <input 
          type="checkbox" 
          id="organizationSame" 
          checked={organizationSame}
          onChange={() => setOrganizationSame(!organizationSame)}
        />
        <label htmlFor="organizationSame">Organization and delivery address are the same.</label>
      </div>

      <h2>Payment</h2>
      <p className="ssl-info">
        Payments are SSL encrypted so that your credit card and payment details stay safe.
       <img src={require('../../images/LockKey.png')} alt="lock"></img>
      </p>
      <div className="payment-method">
        <h3>Credit/Debit Card</h3>
        <div className="card-logos">
         <img src={require('../../images/Payment.png')} alt="payment" className="cards"></img>
        </div>
      </div>
       {/* Card Details Form */}
       <div className="card-details">
        <input type="text" id="card-number" placeholder="Card Number*" />

        <input type="text" id="name" placeholder="Name" />

        <div className="expiry-cvv">
          <div>
            <input type="text" id="expiry" placeholder="MM/YY" />
            <label>Card Expiry date</label>
          </div>
          <div>
            <input type="text" id="cvv" placeholder="CVV" />
          </div>
          <img src={require('../../images/QuestionMark.png')} alt="?" className="question"></img>
        </div>
      </div>

      {/* Auto Purchase Option */}
      <div className="auto-purchase">
        <input 
          type="checkbox" 
          id="auto-purchase" 
          checked={autoPurchase} 
          onChange={handleAutoPurchaseChange}
        />
        <label htmlFor="auto-purchase">
          Auto Purchase <span className="save-info">Save 5% each month</span>
        </label>
      </div>

      {/* Alternative Payment - Paytm */}
      <div className="alternative-payment">
        <h3>Paytm</h3>
        <img src={require('../../images/paypal.png')} alt="PayPal" className="paypal" />
      </div>
    </div>

    {/* Right Section - Order Summary */}
   <div className="outer-checkout-summary">
    <div className="checkout-summary">
      <div className="plan-details-1">
        <div className="image-placeholder" />
        <div className="plan-info">
          <h3>Virtual Intelligence BMA <span>Basic Plan</span></h3>
          <p>Plan Renewal: Monthly</p>
          <p>Range: 50 Employee</p>
        </div>
      </div>

      <div className="order-summary">
      <div className="order-item">
        <h3>Your Order</h3>
        <span className="update">Update</span>
        </div>
        <div className="order-item">
          <span>Item</span>
          <span>$50.25</span>
        </div>
        <div className="order-item">
          <span>Sales Tax</span>
          <span>$6.25</span>
        </div>
        <div className="order-item">
          <span>Delivery</span>
          <span>$3.50</span>
        </div>
        <div className="order-item total">
          <span>Total</span>
          <span>$60.00</span>
        </div>
      </div>

      <div className="coupon">
        {/* <input type="checkbox" id="useCoupon" /> */}
        <img src={require('../../images/arrowVector.png')} alt="arrow"></img>
        <label htmlFor="useCoupon">USE COUPON CODE</label>
      </div>
    </div>
    <button className="Place-Order">Place Order</button>
    </div>
  </div>
  );


  return (
    <>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <Tabs.TabPane tab="Your Plans" key="1">
          {activeTab === "1" && YourPlan}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Billing History" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Plans" key="3">
          {activeTab === "3" && (showBillingDetails ? BillingDetails : Plans)}
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default memo(Subscription);
