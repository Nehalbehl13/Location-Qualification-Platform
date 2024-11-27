// Initialize the map
const map = L.map("map").setView([20.5937, 78.9629], 5); // Set the view to India

// Add OpenStreetMap base layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// Layers for different data types
let environmentalLayer;
let communityLayer;
let complianceLayer;

// Drawing and exporting variables
let drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
let drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
  },
});
let drawingEnabled = false;

// Function to show environmental sensitivity areas
function showEnvironmentalLayer() {
  clearLayers(); // Clear previous layers if any

  environmentalLayer = L.geoJSON(getEnvironmentalData(), {
    style: {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      layer.bindPopup(
        `<strong>${feature.properties.name}</strong><br>Environmental Sensitivity Level: High`
      );
    },
  }).addTo(map);
}

// Function to show community impact areas
function showCommunityLayer() {
  clearLayers(); // Clear previous layers if any

  communityLayer = L.geoJSON(getCommunityData(), {
    style: {
      color: "blue",
      fillColor: "#03f",
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      layer.bindPopup(
        `<strong>${feature.properties.name}</strong><br>Community Impact: High`
      );
    },
  }).addTo(map);
}

// Function to show regulatory compliance data
function showComplianceLayer() {
  clearLayers(); // Clear previous layers if any

  complianceLayer = L.geoJSON(getComplianceData(), {
    style: {
      color: "green",
      fillColor: "#0f3",
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      layer.bindPopup(
        `<strong>${feature.properties.name}</strong><br>Regulatory Compliance: Required`
      );
    },
  }).addTo(map);
}

// Function to clear all layers
function clearLayers() {
  if (environmentalLayer) map.removeLayer(environmentalLayer);
  if (communityLayer) map.removeLayer(communityLayer);
  if (complianceLayer) map.removeLayer(complianceLayer);
  drawnItems.clearLayers();
}

// Toggle drawing on the map
function toggleDraw() {
  if (drawingEnabled) {
    map.removeControl(drawControl);
  } else {
    map.addControl(drawControl);
  }
  drawingEnabled = !drawingEnabled;
}

// Listen for drawing events
map.on(L.Draw.Event.CREATED, (e) => {
  drawnItems.addLayer(e.layer);
});

// Mock data for environmental sensitivity areas
function getEnvironmentalData() {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [78.9629, 20.5937],
              [79.5, 21],
              [79, 21.5],
              [78.5, 21],
              [78.9629, 20.5937],
            ],
          ],
        },
        properties: {
          name: "Protected Wildlife Habitat",
        },
      },
    ],
  };
}

// Mock data for community impact areas
function getCommunityData() {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [77.5, 22],
              [78, 22.5],
              [77.5, 23],
              [77, 22.5],
              [77.5, 22],
            ],
          ],
        },
        properties: {
          name: "High Population Density Area",
        },
      },
    ],
  };
}

// Mock data for regulatory compliance areas
function getComplianceData() {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [80, 21],
              [80.5, 21.5],
              [80, 22],
              [79.5, 21.5],
              [80, 21],
            ],
          ],
        },
        properties: {
          name: "Regulatory Concern Area",
        },
      },
    ],
  };
}

// Export map as an image
function exportMap() {
  // Export the current map view as an image using the leaflet-easyPrint plugin
  L.easyPrint({
    title: "Export Map",
    position: "topleft",
    exportOnly: true,
  }).printMap("CurrentSize", "LQP Map Export");
}

// Modal functionality
function showModal(id) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");

  let content = "";

  switch (id) {
    case "env-sensitivity":
      content =
        "<h3>Environmental Sensitivity Analysis</h3><p>This tool helps identify areas with high environmental sensitivity, such as protected ecosystems, wildlife habitats, and areas prone to natural disasters. By overlaying environmental data with proposed project sites, it ensures careful consideration of vulnerable areas.</p>";
      break;
    case "community-impact":
      content =
        "<h3>Community and Social Impact Evaluation</h3><p>This tool integrates demographic and social data to assess the impact of infrastructure projects on local communities, ensuring that developments align with community needs and minimize disruption.</p>";
      break;
    case "regulatory-compliance":
      content =
        "<h3>Regulatory Compliance and Risk Management</h3><p>This tool evaluates compliance with environmental regulations and identifies potential risks, providing a streamlined approach for regulatory bodies and stakeholders to access critical data.</p>";
      break;
    case "additional-tools":
      content =
        "<h3>Additional Tools</h3><p>This section offers tools for drawing on the map, exporting the map, and clearing layers to facilitate customized analyses and presentations.</p>";
      break;
  }

  modalText.innerHTML = content;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Dropdown toggle functionality
function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.classList.toggle("show");
}