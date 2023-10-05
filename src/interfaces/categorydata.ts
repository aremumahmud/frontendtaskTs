export default interface CategoryData {
    main: {
      name: string;
      id: any;
    };
    subcategories: Array<{
      id: any;
      name: string | null;
    }>;
  }