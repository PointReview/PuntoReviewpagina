export interface QRCodeData {
  id: string;
  code: string;
  status: "UNACTIVATED" | "ACTIVE" | "DISABLED";
  created_at: string;
  activated_at: string | null;
  client?: string;
  destination_url?: string;
  business_name?: string;
  notes?: string;
  scanCount?: number;
  lastScan?: string | null;
  business?: {
    name: string;
    address: string;
    city?: string;
    google_place_id?: string;
    google_review_url?: string;
  };
}

export const qrService = {
  async getAll(token: string): Promise<QRCodeData[]> {
    const res = await fetch("/api/admin/qr", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to fetch QRs");
    return res.json();
  },

  async generateBulk(quantity: number, token: string): Promise<QRCodeData[]> {
    const res = await fetch("/api/admin/qr/bulk", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ quantity })
    });
    
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate bulk QRs");
    }
    
    return res.json();
  },

  async generate(data: { code?: string }, token: string): Promise<QRCodeData> {
    const res = await fetch("/api/admin/qr", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate QR");
    }
    
    return res.json();
  },

  async update(id: string, data: { destination_url?: string; business_name?: string; notes?: string }, token: string): Promise<QRCodeData> {
    const res = await fetch(`/api/admin/qr/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update QR");
    return res.json();
  },

  async delete(id: string, token: string): Promise<void> {
    const res = await fetch(`/api/admin/qr/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Failed to delete QR");
  },
  async toggleStatus(id: string, status: "ACTIVE" | "DISABLED", token: string): Promise<QRCodeData> {
    const res = await fetch(`/api/admin/qr/${id}/status`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error("Failed to toggle status");
    return res.json();
  }
};
