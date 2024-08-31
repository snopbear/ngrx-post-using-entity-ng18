
// Unit tests for: ngOnInit






import { IPost } from '../../../models/posts.interface';





import { EditPostComponent } from '../edit-post.component';


class MockFormGroup {
  public patchValue = jest.fn();
}


class MockStore {
  public select = jest.fn();
}

class MockRouter {
  public navigate = jest.fn();
}

class MockActivatedRoute {
  public paramMap = {
    subscribe: jest.fn(),
  };
}

describe('EditPostComponent.ngOnInit() ngOnInit method', () => {
  let component: EditPostComponent;
  let mockStore: MockStore;
  let mockRouter: MockRouter;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(() => {
    mockStore = new MockStore() as any;
    mockRouter = new MockRouter() as any;
    mockActivatedRoute = new MockActivatedRoute() as any;

    component = new EditPostComponent(
      mockStore as any,
      mockRouter as any,
      mockActivatedRoute as any
    );
  });

  describe('Happy Path', () => {
    it('should initialize the form and patch values when post is found', () => {
      // Arrange
      const mockPost: IPost = { id: '1', title: 'Test Title', description: 'Test Description' };
      const mockFormGroup = new MockFormGroup() as any;
      component.postForm = mockFormGroup;

      mockActivatedRoute.paramMap.subscribe.mockImplementation((callback: any) => {
        callback({ get: jest.fn().mockReturnValue('1') });
      });

      mockStore.select.mockReturnValue({
        subscribe: (callback: any) => callback(mockPost),
      });

      jest.spyOn(component, 'createForm').mockImplementation(() => {
        component.postForm = mockFormGroup;
      });

      // Act
      component.ngOnInit();

      // Assert
      expect(component.createForm).toHaveBeenCalled();
      expect(component.postForm.patchValue).toHaveBeenCalledWith({
        title: 'Test Title',
        description: 'Test Description',
      });
    });
  });

  describe('Edge Cases', () => {
    it('should not patch values if post is not found', () => {
      // Arrange
      const mockFormGroup = new MockFormGroup() as any;
      component.postForm = mockFormGroup;

      mockActivatedRoute.paramMap.subscribe.mockImplementation((callback: any) => {
        callback({ get: jest.fn().mockReturnValue('1') });
      });

      mockStore.select.mockReturnValue({
        subscribe: (callback: any) => callback(null),
      });

      jest.spyOn(component, 'createForm').mockImplementation(() => {
        component.postForm = mockFormGroup;
      });

      // Act
      component.ngOnInit();

      // Assert
      expect(component.createForm).toHaveBeenCalled();
      expect(component.postForm.patchValue).not.toHaveBeenCalled();
    });

    it('should handle missing id in route params gracefully', () => {
      // Arrange
      const mockFormGroup = new MockFormGroup() as any;
      component.postForm = mockFormGroup;

      mockActivatedRoute.paramMap.subscribe.mockImplementation((callback: any) => {
        callback({ get: jest.fn().mockReturnValue(null) });
      });

      mockStore.select.mockReturnValue({
        subscribe: (callback: any) => callback(null),
      });

      jest.spyOn(component, 'createForm').mockImplementation(() => {
        component.postForm = mockFormGroup;
      });

      // Act
      component.ngOnInit();

      // Assert
      expect(component.createForm).toHaveBeenCalled();
      expect(component.postForm.patchValue).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: ngOnInit
