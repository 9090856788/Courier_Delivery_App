import bcrypt from "bcryptjs";

// In-memory data store used when MongoDB is offline / not configured
const hashPassword = (pw) => bcrypt.hashSync(pw, 10);

const initialAdmin = {
  _id: "admin-user-001",
  name: "CargoPilot Admin",
  email: "admin@cargopilot.com",
  password: hashPassword("admin123"),
  role: "admin",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  comparePassword(enteredPassword) {
    if (typeof enteredPassword !== "string") return false;
    return bcrypt.compareSync(enteredPassword, this.password);
  },
  toObject() {
    const { password, ...rest } = this;
    return rest;
  },
};

const users = [initialAdmin];

const now = new Date();
const pastDate = (daysAgo, hoursAgo = 0) => {
  const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000 - hoursAgo * 60 * 60 * 1000);
  return d;
};
const futureDate = (daysAhead) => {
  const d = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  return d;
};

const initialParcels = [
  {
    _id: "parcel-001",
    trackingId: "IND-82914710",
    senderName: "Rahul Sharma",
    senderPhoneNumber: "+919876543210",
    senderAddress: "12 MG Road, Indiranagar, Bengaluru, Karnataka",
    receiverName: "Priya Patel",
    receiverPhoneNumber: "+919812345678",
    receiverAddress: "45 Linking Road, Bandra West, Mumbai, Maharashtra",
    originCity: "Bengaluru",
    destinationCity: "Mumbai",
    shipmentType: "National",
    parcelCategory: "electronics",
    deliveryType: "standard",
    parcelWeight: 2.5,
    parcelPrice: 1550,
    parcelSize: "medium",
    parcelDescription: "Dell XPS Laptop and accessories",
    deliveryDate: futureDate(2),
    createdBy: "admin-user-001",
    updatedBy: "admin-user-001",
    createdAt: pastDate(2, 4),
    updatedAt: pastDate(0, 3),
    checkPoints: [
      {
        _id: "cp-001-1",
        location: "Bengaluru",
        title: "Parcel arrived at Bengaluru Branch",
        description: "Your parcel has arrived at Bengaluru Branch and is being processed.",
        status: "arrived",
        updatedBy: "System",
        createdAt: pastDate(2, 4),
        updatedAt: pastDate(2, 4),
      },
      {
        _id: "cp-001-2",
        location: "Pune Transit Hub",
        title: "Departed from Transit Facility",
        description: "Package sorted and dispatched towards Mumbai Hub.",
        status: "in_transit",
        updatedBy: "Admin",
        createdAt: pastDate(1, 6),
        updatedAt: pastDate(1, 6),
      },
      {
        _id: "cp-001-3",
        location: "Mumbai Distribution Center",
        title: "Out for Delivery",
        description: "Shipment is out for delivery with courier partner Suresh.",
        status: "out_for_delivery",
        updatedBy: "Admin",
        createdAt: pastDate(0, 3),
        updatedAt: pastDate(0, 3),
      },
    ],
  },
  {
    _id: "parcel-002",
    trackingId: "IND-39182741",
    senderName: "Amit Verma",
    senderPhoneNumber: "+919823456789",
    senderAddress: "Connaught Place, New Delhi",
    receiverName: "Ananya Sen",
    receiverPhoneNumber: "+919834567890",
    receiverAddress: "Park Street, Kolkata, West Bengal",
    originCity: "Delhi",
    destinationCity: "Kolkata",
    shipmentType: "National",
    parcelCategory: "documents",
    deliveryType: "sameDay",
    parcelWeight: 0.5,
    parcelPrice: 500,
    parcelSize: "small",
    parcelDescription: "Commercial Property Agreement Documents",
    deliveryDate: pastDate(1),
    createdBy: "admin-user-001",
    updatedBy: "admin-user-001",
    createdAt: pastDate(4),
    updatedAt: pastDate(1),
    checkPoints: [
      {
        _id: "cp-002-1",
        location: "Delhi",
        title: "Parcel received at Delhi Central",
        description: "Package received and verified.",
        status: "arrived",
        updatedBy: "System",
        createdAt: pastDate(4),
        updatedAt: pastDate(4),
      },
      {
        _id: "cp-002-2",
        location: "Kolkata Airport Cargo",
        title: "In Transit via Air Cargo",
        description: "Shipment reached destination city airport.",
        status: "in_transit",
        updatedBy: "Admin",
        createdAt: pastDate(2),
        updatedAt: pastDate(2),
      },
      {
        _id: "cp-002-3",
        location: "Kolkata",
        title: "Delivered Successfully",
        description: "Package delivered to recipient. Signed by Ananya Sen.",
        status: "delivered",
        updatedBy: "Admin",
        createdAt: pastDate(1),
        updatedAt: pastDate(1),
      },
    ],
  },
  {
    _id: "parcel-003",
    trackingId: "IND-57192830",
    senderName: "Vikram Singh",
    senderPhoneNumber: "+919845678901",
    senderAddress: "C-Scheme, Jaipur, Rajasthan",
    receiverName: "Sneha Nair",
    receiverPhoneNumber: "+919856789012",
    receiverAddress: "T Nagar, Chennai, Tamil Nadu",
    originCity: "Jaipur",
    destinationCity: "Chennai",
    shipmentType: "National",
    parcelCategory: "fragile",
    deliveryType: "standard",
    parcelWeight: 3.2,
    parcelPrice: 2000,
    parcelSize: "medium",
    parcelDescription: "Handcrafted Blue Pottery Ceramic Decor",
    deliveryDate: futureDate(3),
    createdBy: "admin-user-001",
    updatedBy: "admin-user-001",
    createdAt: pastDate(1, 12),
    updatedAt: pastDate(0, 5),
    checkPoints: [
      {
        _id: "cp-003-1",
        location: "Jaipur",
        title: "Parcel arrived at Jaipur Hub",
        description: "Initial check-in and fragile package labeling completed.",
        status: "arrived",
        updatedBy: "System",
        createdAt: pastDate(1, 12),
        updatedAt: pastDate(1, 12),
      },
      {
        _id: "cp-003-2",
        location: "Nagpur Sorting Hub",
        title: "In Transit - Central India Hub",
        description: "En route to southern distribution center.",
        status: "in_transit",
        updatedBy: "Admin",
        createdAt: pastDate(0, 5),
        updatedAt: pastDate(0, 5),
      },
    ],
  },
  {
    _id: "parcel-004",
    trackingId: "IND-61928374",
    senderName: "Meera Joshi",
    senderPhoneNumber: "+919867890123",
    senderAddress: "Navrangpura, Ahmedabad, Gujarat",
    receiverName: "Rohit Das",
    receiverPhoneNumber: "+919878901234",
    receiverAddress: "Banjara Hills, Hyderabad, Telangana",
    originCity: "Ahmedabad",
    destinationCity: "Hyderabad",
    shipmentType: "National",
    parcelCategory: "clothing",
    deliveryType: "overnight",
    parcelWeight: 1.8,
    parcelPrice: 1080,
    parcelSize: "medium",
    parcelDescription: "Designer Silk Sarees and Fabric Samples",
    deliveryDate: futureDate(1),
    createdBy: "admin-user-001",
    updatedBy: "admin-user-001",
    createdAt: pastDate(0, 8),
    updatedAt: pastDate(0, 8),
    checkPoints: [
      {
        _id: "cp-004-1",
        location: "Ahmedabad",
        title: "Parcel received at Ahmedabad Hub",
        description: "Processed for overnight dispatch to Hyderabad.",
        status: "arrived",
        updatedBy: "System",
        createdAt: pastDate(0, 8),
        updatedAt: pastDate(0, 8),
      },
    ],
  },
  {
    _id: "parcel-005",
    trackingId: "IND-92837415",
    senderName: "Rajesh Khanna",
    senderPhoneNumber: "+919889012345",
    senderAddress: "Sector 17, Chandigarh",
    receiverName: "Kavita Reddy",
    receiverPhoneNumber: "+919890123456",
    receiverAddress: "Koramangala, Bengaluru, Karnataka",
    originCity: "Chandigarh",
    destinationCity: "Bengaluru",
    shipmentType: "National",
    parcelCategory: "medicine",
    deliveryType: "sameDay",
    parcelWeight: 1.2,
    parcelPrice: 1000,
    parcelSize: "small",
    parcelDescription: "Prescription temperature-controlled medications",
    deliveryDate: pastDate(3),
    createdBy: "admin-user-001",
    updatedBy: "admin-user-001",
    createdAt: pastDate(7),
    updatedAt: pastDate(3),
    checkPoints: [
      {
        _id: "cp-005-1",
        location: "Chandigarh",
        title: "Emergency Medical Shipment Checked In",
        description: "Cold-pack insulation verified.",
        status: "arrived",
        updatedBy: "System",
        createdAt: pastDate(7),
        updatedAt: pastDate(7),
      },
      {
        _id: "cp-005-2",
        location: "Delhi Airport Cargo",
        title: "Express Air Transit",
        description: "Dispatched on flight to Bengaluru.",
        status: "in_transit",
        updatedBy: "Admin",
        createdAt: pastDate(5),
        updatedAt: pastDate(5),
      },
      {
        _id: "cp-005-3",
        location: "Bengaluru",
        title: "Delivered to Recipient",
        description: "Received by Dr. Kavita Reddy.",
        status: "delivered",
        updatedBy: "Admin",
        createdAt: pastDate(3),
        updatedAt: pastDate(3),
      },
    ],
  },
  {
    _id: "parcel-006",
    trackingId: "IND-40192853",
    senderName: "Kiran Kulkarni",
    senderPhoneNumber: "+919891234567",
    senderAddress: "Kothrud, Pune, Maharashtra",
    receiverName: "Manoj Mishra",
    receiverPhoneNumber: "+919892345678",
    receiverAddress: "Saheed Nagar, Bhubaneswar, Odisha",
    originCity: "Pune",
    destinationCity: "Bhubaneswar",
    shipmentType: "National",
    parcelCategory: "food",
    deliveryType: "standard",
    parcelWeight: 4.5,
    parcelPrice: 2470,
    parcelSize: "large",
    parcelDescription: "Artisanal dry fruit confectioneries",
    deliveryDate: futureDate(1),
    createdBy: "admin-user-001",
    updatedBy: "admin-user-001",
    createdAt: pastDate(3),
    updatedAt: pastDate(1),
    checkPoints: [
      {
        _id: "cp-006-1",
        location: "Pune",
        title: "Parcel booked at Pune Hub",
        description: "Package received.",
        status: "arrived",
        updatedBy: "System",
        createdAt: pastDate(3),
        updatedAt: pastDate(3),
      },
      {
        _id: "cp-006-2",
        location: "Raipur Transit",
        title: "Transit Delayed due to Weather",
        description: "Temporary weather delay at transit facility. New ETA updated.",
        status: "delayed",
        updatedBy: "Admin",
        createdAt: pastDate(1),
        updatedAt: pastDate(1),
      },
    ],
  },
  {
    _id: "parcel-007",
    trackingId: "IND-71829465",
    senderName: "Apex Global Tech",
    senderPhoneNumber: "+919893456789",
    senderAddress: "Electronic City, Bengaluru, India",
    receiverName: "James Smith",
    receiverPhoneNumber: "+442079460912",
    receiverAddress: "Canary Wharf, London, United Kingdom",
    originCity: "Bengaluru",
    destinationCity: "United Kingdom, London",
    shipmentType: "International",
    parcelCategory: "electronics",
    deliveryType: "standard",
    parcelWeight: 1.5,
    parcelPrice: 23000,
    parcelSize: "medium",
    parcelDescription: "Embedded IoT Prototype Modules",
    deliveryDate: futureDate(5),
    createdBy: "admin-user-001",
    updatedBy: "admin-user-001",
    createdAt: pastDate(2),
    updatedAt: pastDate(1),
    checkPoints: [
      {
        _id: "cp-007-1",
        location: "Bengaluru International Air Cargo",
        title: "Customs Clearance Initiated",
        description: "Export documentation approved.",
        status: "arrived",
        updatedBy: "System",
        createdAt: pastDate(2),
        updatedAt: pastDate(2),
      },
      {
        _id: "cp-007-2",
        location: "Dubai Air Cargo Hub",
        title: "International Transit Hub",
        description: "Transferred to connecting flight to London Heathrow.",
        status: "in_transit",
        updatedBy: "Admin",
        createdAt: pastDate(1),
        updatedAt: pastDate(1),
      },
    ],
  },
];

const clone = (obj) => JSON.parse(JSON.stringify(obj));

export const memoryStore = {
  users,
  parcels: initialParcels,

  User: {
    async findOne(query) {
      if (query.email) {
        const target = query.email.trim().toLowerCase();
        const found = users.find((u) => u.email.toLowerCase() === target);
        return found || null;
      }
      if (query._id) {
        const found = users.find((u) => u._id === query._id);
        return found || null;
      }
      return users[0] || null;
    },

    findById(id) {
      const chain = {
        select(exclude) {
          return chain;
        },
        then(resolve, reject) {
          const found = users.find((u) => u._id === id);
          if (!found) return resolve(null);
          const c = clone(found);
          delete c.password;
          resolve({
            ...c,
            comparePassword(entered) {
              return bcrypt.compareSync(entered, found.password);
            },
            toObject() {
              return clone(c);
            },
          });
        },
      };
      return chain;
    },

    async create(data) {
      const newUser = {
        _id: "user-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
        name: data.name,
        email: data.email.toLowerCase().trim(),
        password: hashPassword(data.password),
        role: data.role || "admin",
        createdAt: new Date(),
        comparePassword(entered) {
          return bcrypt.compareSync(entered, this.password);
        },
        toObject() {
          const { password, ...rest } = this;
          return rest;
        },
      };
      users.push(newUser);
      return newUser;
    },

    async countDocuments() {
      return users.length;
    },

    async aggregate(pipeline) {
      const now = new Date();
      const results = [];
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const key = `${y}-${String(m).padStart(2, "0")}`;
        results.push({
          key,
          users: 1,
        });
      }
      return results;
    },

    async deleteOne(query) {
      if (query._id) {
        const idx = users.findIndex((u) => u._id === query._id);
        if (idx !== -1) users.splice(idx, 1);
      }
      return { deletedCount: 1 };
    },
  },

  Parcel: {
    async create(data) {
      const parcel = {
        _id: "parcel-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        checkPoints: data.checkPoints || [],
        async save() {
          this.updatedAt = new Date();
          const idx = memoryStore.parcels.findIndex((p) => p._id === this._id);
          if (idx !== -1) {
            memoryStore.parcels[idx] = this;
          } else {
            memoryStore.parcels.push(this);
          }
          return this;
        },
        toObject() {
          return clone(this);
        },
      };
      memoryStore.parcels.unshift(parcel);
      return parcel;
    },

    async findOne(query) {
      let found = null;
      if (query.trackingId) {
        const tId = query.trackingId.trim().toUpperCase();
        found = memoryStore.parcels.find((p) => p.trackingId.toUpperCase() === tId);
      } else if (query._id) {
        found = memoryStore.parcels.find((p) => p._id === query._id);
      }

      if (!found) return null;

      // Wrap with save method
      return {
        ...found,
        async save() {
          this.updatedAt = new Date();
          const idx = memoryStore.parcels.findIndex((p) => p._id === this._id);
          if (idx !== -1) {
            memoryStore.parcels[idx] = this;
          }
          return this;
        },
        toObject() {
          return clone(this);
        },
      };
    },

    find(query = {}) {
      let filtered = [...memoryStore.parcels];

      // Handle status filter ($expr with latest checkpoint)
      if (query.$expr && query.$expr.$eq) {
        const expectedStatus = query.$expr.$eq[1];
        filtered = filtered.filter((p) => {
          const lastCp = p.checkPoints && p.checkPoints[p.checkPoints.length - 1];
          return lastCp && lastCp.status === expectedStatus;
        });
      }

      // Handle trackingId regex search
      if (query.trackingId && query.trackingId.$regex) {
        const re = new RegExp(query.trackingId.$regex, query.trackingId.$options || "i");
        filtered = filtered.filter((p) => re.test(p.trackingId));
      }

      let sortFn = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
      let skipCount = 0;
      let limitCount = filtered.length;

      const chain = {
        sort(sortObj) {
          return chain;
        },
        skip(n) {
          skipCount = n;
          return chain;
        },
        limit(n) {
          limitCount = n;
          return chain;
        },
        then(resolve, reject) {
          const sliced = filtered.slice(skipCount, skipCount + limitCount).map((p) => ({
            ...p,
            async save() {
              const idx = memoryStore.parcels.findIndex((item) => item._id === p._id);
              if (idx !== -1) memoryStore.parcels[idx] = this;
              return this;
            },
            toObject() {
              return clone(p);
            },
          }));
          resolve(sliced);
        },
      };

      return chain;
    },

    async countDocuments(query = {}) {
      let filtered = [...memoryStore.parcels];

      if (query.$expr && query.$expr.$eq) {
        const expectedStatus = query.$expr.$eq[1];
        filtered = filtered.filter((p) => {
          const lastCp = p.checkPoints && p.checkPoints[p.checkPoints.length - 1];
          return lastCp && lastCp.status === expectedStatus;
        });
      }

      if (query.trackingId && query.trackingId.$regex) {
        const re = new RegExp(query.trackingId.$regex, query.trackingId.$options || "i");
        filtered = filtered.filter((p) => re.test(p.trackingId));
      }

      return filtered.length;
    },

    async aggregate(pipeline) {
      const parcels = memoryStore.parcels;

      // 1. Total revenue
      if (
        pipeline.length === 1 &&
        pipeline[0].$group &&
        pipeline[0].$group.revenue
      ) {
        const total = parcels.reduce((sum, p) => sum + (Number(p.parcelPrice) || 0), 0);
        return [{ _id: null, revenue: total }];
      }

      // 2. Status distribution
      if (
        pipeline.some((stage) => stage.$group && stage.$group._id === "$currentStatus")
      ) {
        const counts = { arrived: 0, in_transit: 0, out_for_delivery: 0, delivered: 0, delayed: 0 };
        for (const p of parcels) {
          const lastCp = p.checkPoints && p.checkPoints[p.checkPoints.length - 1];
          const st = lastCp ? lastCp.status : "arrived";
          counts[st] = (counts[st] || 0) + 1;
        }
        return Object.entries(counts).map(([status, value]) => ({ status, value }));
      }

      // 3. Weight buckets
      if (pipeline.some((stage) => stage.$bucket)) {
        const buckets = [
          { _id: 0, count: 0 },
          { _id: 1, count: 0 },
          { _id: 2, count: 0 },
          { _id: 3, count: 0 },
          { _id: 4, count: 0 },
        ];
        for (const p of parcels) {
          const w = Number(p.parcelWeight) || 0;
          if (w < 1) buckets[0].count++;
          else if (w < 3) buckets[1].count++;
          else if (w < 5) buckets[2].count++;
          else if (w < 10) buckets[3].count++;
          else buckets[4].count++;
        }
        return buckets;
      }

      // 4. Top cities
      if (pipeline.some((stage) => stage.$group && stage.$group._id === "$destinationCity")) {
        const cityMap = {};
        for (const p of parcels) {
          const c = p.destinationCity || "Unknown";
          cityMap[c] = (cityMap[c] || 0) + 1;
        }
        const sorted = Object.entries(cityMap)
          .map(([city, parcels]) => ({ city, parcels }))
          .sort((a, b) => b.parcels - a.parcels)
          .slice(0, 8);
        return sorted;
      }

      // 5. Monthly parcels / revenue / delivery performance
      // Provide realistic aggregations based on parcels' timestamps
      const now = new Date();
      const results = [];
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const key = `${y}-${String(m).padStart(2, "0")}`;

        const monthParcels = parcels.filter((p) => {
          const cd = new Date(p.createdAt);
          return cd.getFullYear() === y && cd.getMonth() + 1 === m;
        });

        const total = monthParcels.length;
        const delivered = monthParcels.filter((p) => {
          const lastCp = p.checkPoints && p.checkPoints[p.checkPoints.length - 1];
          return lastCp && lastCp.status === "delivered";
        }).length;
        const revenue = monthParcels.reduce((sum, p) => sum + (Number(p.parcelPrice) || 0), 0);

        results.push({
          key,
          parcels: total || (i < 4 ? 3 + i : 1),
          revenue: revenue || (i < 4 ? (3 + i) * 1200 : 1500),
          total: total || (i < 4 ? 3 + i : 1),
          delivered: delivered || (i < 4 ? Math.max(1, i) : 1),
        });
      }

      return results;
    },

    async distinct(field) {
      if (field === "destinationCity") {
        const cities = new Set(memoryStore.parcels.map((p) => p.destinationCity).filter(Boolean));
        return Array.from(cities);
      }
      return [];
    },
  },
};
