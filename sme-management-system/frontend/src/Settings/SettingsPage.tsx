import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { api } from "../api/axios";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    businessName: "",
    phone: "",
    email: "",
    address: "",
    currency: "KES",
    taxRate: 0,
    receiptHeader: "",
    receiptFooter: "",
    autoPrint: false,
    printLogo: true,
    reorderLevel: 5,
    lowStockAlert: true,
    enableDiscounts: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await api.get("/settings");
      setSettings(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      await api.put("/settings", settings);
      toast.success("Settings saved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save settings");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">Loading Settings...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="max-w-6xl mx-auto space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="text-gray-500">
            Manage your MGhetto Retailer system settings.
          </p>
        </div>

        {/* Business Information */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Business Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="border rounded-lg p-3"
              placeholder="Business Name"
              value={settings.businessName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  businessName: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Phone Number"
              value={settings.phone || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  phone: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Email Address"
              value={settings.email || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  email: e.target.value,
                })
              }
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Currency"
              value={settings.currency}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  currency: e.target.value,
                })
              }
            />

            <textarea
              className="border rounded-lg p-3 md:col-span-2"
              rows={3}
              placeholder="Business Address"
              value={settings.address || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  address: e.target.value,
                })
              }
            />

          </div>

        </div>

        {/* Receipt */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Receipt Settings
          </h2>

          <div className="space-y-4">

            <input
              className="border rounded-lg p-3 w-full"
              placeholder="Receipt Header"
              value={settings.receiptHeader || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  receiptHeader: e.target.value,
                })
              }
            />

            <textarea
              className="border rounded-lg p-3 w-full"
              rows={3}
              placeholder="Receipt Footer"
              value={settings.receiptFooter || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  receiptFooter: e.target.value,
                })
              }
            />

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={settings.printLogo}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    printLogo: e.target.checked,
                  })
                }
              />

              Print Logo On Receipt

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={settings.autoPrint}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    autoPrint: e.target.checked,
                  })
                }
              />

              Auto Print Receipt

            </label>

          </div>

        </div>

        {/* Inventory */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Inventory Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              className="border rounded-lg p-3"
              placeholder="Reorder Level"
              value={settings.reorderLevel}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  reorderLevel: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              className="border rounded-lg p-3"
              placeholder="Tax Rate"
              value={settings.taxRate}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  taxRate: Number(e.target.value),
                })
              }
            />

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={settings.lowStockAlert}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    lowStockAlert: e.target.checked,
                  })
                }
              />

              Enable Low Stock Alerts

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={settings.enableDiscounts}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableDiscounts: e.target.checked,
                  })
                }
              />

              Enable Discounts

            </label>

          </div>

        </div>

        {/* Save */}

        <div className="flex justify-end">

          <button
            onClick={saveSettings}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Save Changes
          </button>

        </div>

      </div>

    </AdminLayout>
  );
}