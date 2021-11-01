import { shallowMount } from '@vue/test-utils';
import SkrablDeck from '@/components/SkrablDeck.vue';

describe('SkrablDeck.vue', () => {
    it('renders props.msg when passed', () => {
        const wrapper = shallowMount(SkrablDeck);
        expect(wrapper.element).toBeTruthy;
    });
});
