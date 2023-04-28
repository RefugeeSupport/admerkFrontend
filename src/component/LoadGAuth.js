import React, { useState, useEffect } from "react";

let tokenClient = {};
// The component lets you render a child, that onClicked authenticates google and fetches contacts
// The onClick function is also passed the contacts
function LoadGAuth({ onClick, children, isLoading }) {
  const CLIENT_ID =
    "380231205101-qhtnsmh4h866rvk2db2eppp20p05sfod.apps.googleusercontent.com";
  const API_KEY = "AIzaSyA5ofM9qPDCD4NIZD3AvJEf7KMOZYTY8ZE";
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/people/v1/rest";
  const SCOPES = "https://www.googleapis.com/auth/contacts.readonly";

  const [gsiInitiated, setGsiInitiated] = useState(false);
  const [gapiInitiated, setGapiInitiated] = useState(false);

  useEffect(() => {
    // Load GAPI Script
    async function initializeGapiClient() {
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      //gapiInited = true;
      setGapiInitiated(true);
    }

    function gapiLoaded() {
      window.gapi.load("client", initializeGapiClient);
    }

    function LoadGapiScript() {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = gapiLoaded;
      script.async = true;
      script.id = "google-api-script";
      document.querySelector("body")?.appendChild(script);
    }

    if (!window.gapi || !gapiInitiated) LoadGapiScript();

    // Initialize GSI
    const initializeGsi = async () => {
      if (!window.google || gsiInitiated) return;

      setGsiInitiated(true);
      tokenClient = await window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "",
      });
    };

    function loadGsiScript() {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = initializeGsi;
      script.async = true;
      script.id = "google-client-script";
      document.querySelector("body")?.appendChild(script);
    }

    if (!window.google || !gsiInitiated) loadGsiScript();

    return () => {
      // Cleanup function that runs when component unmounts
      // window.google?.accounts.id.cancel()
      document.getElementById("google-api-script")?.remove();
      document.getElementById("google-client-script")?.remove();
    };
  }, []);

  async function handleAuthClick({ successCallback }) {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      const contacts = await getContacts();
      successCallback(contacts);
    };

    if (window.gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  async function getContacts() {
    let response;
    try {
      // Fetch first 10 files
      response = await window.gapi.client.people.people.connections.list({
        resourceName: "people/me",
        // pageSize: 10,
        personFields: "names,emailAddresses,phoneNumbers",
      });
    } catch (err) {
      console.log("[listConnectionNames][err]: ", err);
      return;
    }
    const connections = response.result.connections;
    if (!connections || connections.length == 0) {
      console.log("[getContacts] No connections found.");
      return [];
    }

    // Name -> connections[0].names[0].displayName
    // Email -> connections[0].emailAddresses[0].value
    // Number -> connections[0].phoneNumbers[0].value

    console.log("[getContatcs], contacts:  ", connections);
    return connections;
  }

  if (isLoading)
    return (
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  // Recreates child element with new onClick method
  return React.cloneElement(children, {
    onClick: async () => {
      handleAuthClick({ successCallback: onClick });
    },
  });
}

export default LoadGAuth;
