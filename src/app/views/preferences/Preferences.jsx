import React, { useState } from "react";
import { Input } from "../../shared/components/input/Input";
import { Button } from "../../shared/components/button/Button";
import { TextArea } from "../../shared/components/textArea/TextArea";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { Switch } from "../../shared/components/switch/Switch";
import PageContent from "../../shared/components/pageContent/PageContent";
import { Link } from "react-router-dom";

function Preferences() {
  const [receiveNotifications, setReceiveNotifications] = useState(false);

  const handleReceiveNotificationToggle = () => {
    setReceiveNotifications(!receiveNotifications);
  };

  function ChangePassword() {
    return (
      <form>
        <AdvancedCard
          type={"s-card"}
          footer
          footerContentRight={<Button isLight>Save</Button>}
        >
          <h2 className="title is-5 is-bold">Personal Information</h2>
          <>
            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Registered E-mail Address *</label>
                  <Input
                    placeholder={"Enter email"}
                    type={"email"}
                    name={"email"}
                  />
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label>Current Password *</label>
                  <Input
                    type={"password"}
                    placeholder={"Enter Password"}
                    name={"password"}
                  />
                </div>
              </div>
            </div>
            <div className="columns is-multiline m-b-10">
              <div className="column is-12">
                <div className="field">
                  <label>New password *</label>
                  <div className="control">
                    <Input
                      type="password"
                      className="input"
                      name="password"
                      placeholder="Enter Password"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        </AdvancedCard>
      </form>
    );
  }

  function DeleteAccount() {
    return (
      <form className="m-t-20">
        <AdvancedCard
          type={"s-card"}
          footer
          footerContentRight={<Button isLight>Delete</Button>}
        >
          <h3 className="title is-5 is-bold">Delete Account</h3>
          <p className="title is-6 is-narrow is-thin m-1 m-b-2">
            If you delete your groflex account all your data will be lost,
          </p>
          <>
            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Registered E-mail Address *</label>
                  <Input
                    placeholder={"Enter email"}
                    type={"email"}
                    name={"email"}
                  />
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label>Your Password *</label>
                  <Input
                    type={"password"}
                    placeholder={"Enter Password"}
                    name={"password"}
                  />
                </div>
              </div>
            </div>
            <div className="columns is-multiline">
              <div className="column is-12">
                <div className="field">
                  <label>Reason</label>
                  <div className="control">
                    <TextArea
                      rows={3}
                      placeholder={
                        "Enter reason to delete account (Your feedback will help us make groflex even better)"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns is-multiline m-b-10">
              <div className="column is-12">
                <p className="title is-6 is-thin">
                  Please confirm "Delete Account" by clicking confirmation link
                  sent to your email address.
                </p>
              </div>
            </div>
          </>
        </AdvancedCard>
      </form>
    );
  }

  function NotificationsPreference() {
    return (
      <div className="column is-5">
        <AdvancedCard type={"s-card"}>
          <div className="columns is-multiline">
            <div className="column is-8">
              <h3 className="title is-5 is-bold">Your Notifications</h3>
              <p>Receive your notifications</p>
            </div>
            <div className="column is-4 m-t-35">
              <Switch
                onChange={handleReceiveNotificationToggle}
                isSuccess
                checked={receiveNotifications}
              ></Switch>
            </div>
          </div>
        </AdvancedCard>
        <div className="m-t-15" />
        <form>
          <AdvancedCard
            type={"s-card"}
            footer
            footerContentRight={
              <Button isLight isDisabled>
                Save
              </Button>
            }
          >
            <h3 className="title is-5 is-bold">Send Email Preferences</h3>
            <p className="title is-6 is-thin">
              Your customer emails will be sent under this name and email
              address
            </p>
            <div className="columns is-multiline">
              <div className="column is-8">
                <div className="field">
                  <label>Sender Name*</label>

                  <div className="control">
                    <Input
                      type={"text"}
                      className="input"
                      name="sender-name"
                      placeholder="username@gmail.com"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="column is-8 m-b-10">
                <div className="field">
                  <label>Recipient Email Address *</label>
                  <div className="control">
                    <Input
                      type="email"
                      className="input"
                      name="email"
                      placeholder="groflex@gmail.com"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </AdvancedCard>
        </form>
      </div>
    );
  }

  return (
    <PageContent
      titleIsBreadCrumb
      breadCrumbData={["Home", "Account Settings", "Account details"]}
    >
      <div className="page-content-inner">
        <div className="tabs-wrapper">
          <div className="tabs-inner">
            <div className="tabs">
              <ul>
                <li data-tab="account-details-tab">
                  <Link to="/account-settings">Account Details</Link>
                </li>
                <li data-tab="preferences-tab" className="is-active">
                  <Link to="/preferences">Preferences</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="tabs-wrapper m-t-5">
            <div id="account-preference-tab" className="tab-content is-active">
              <div className="columns is-multiline">
                <div className="column is-7">
                  <ChangePassword />
                  <div className="m-t-15" />
                  <DeleteAccount />
                </div>

                <NotificationsPreference />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
}

export default Preferences;
