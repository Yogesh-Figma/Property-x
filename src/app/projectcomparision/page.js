
import './styles.scss'

const ProjectComparision = ({}) => {

    return (<div class="container pb-5 mb-2">
    <div class="comparison-table">
        <table class="table table-bordered">
            <thead class="bg-secondary">
                <tr>
                    <td class="align-middle">
                        <div class="pt-3">
                          
                        </div>
                    </td>
                    <td>
                        <div class="comparison-item"><span class="remove-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
                           
                            <button class="btn btn-pill btn-outline-primary btn-sm" type="button" data-toggle="toast" data-target="#cart-toast">Add to Cart</button>
                        </div>
                    </td>
                    <td>
                        <div class="comparison-item"><span class="remove-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
                           
                            <button class="btn btn-pill btn-outline-primary btn-sm" type="button" data-toggle="toast" data-target="#cart-toast">Add to Cart</button>
                        </div>
                    </td>
                    <td>
                        <div class="comparison-item"><span class="remove-item"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
                           
                            <button class="btn btn-pill btn-outline-primary btn-sm" type="button" data-toggle="toast" data-target="#cart-toast">Add to Cart</button>
                        </div>
                    </td>
                </tr>
            </thead>
            <tbody id="summary" data-filter="target">
                <tr class="bg-secondary">
                    <th class="text-uppercase">Location</th>
                    <td><span class="text-dark font-weight-semibold">Techzone 4, Greater Noida West</span></td>
                    <td><span class="text-dark font-weight-semibold">Sector 43, Noida</span></td>
                    <td><span class="text-dark font-weight-semibold"></span></td>
                </tr>
                <tr>
                    <th>Property Type</th>
                    <td>Apartments</td>
                    <td>Apartments</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>Ready to Move</td>
                    <td>Under Construction</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Price Range</th>
                    <td>60L - 1.82Cr</td>
                    <td>1.56 - 8.83Cr</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Unit Configuration</th>
                    <td>2, 3, 4 BHK</td>
                    <td>2, 3, 4, 5 BHK</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Unit Size</th>
                    <td>955 - 2320 sq ft</td>
                    <td>612.25 - 3754 sq ft</td>
                    <td></td>
                </tr>
            </tbody>
            <tbody id="general" data-filter="target">
                <tr class="bg-secondary">
                    <th class="">Project Area</th>
                    <td><span class="">11 Acres</span></td>
                    <td><span class="">11 Acres</span></td>
                    <td><span class=""></span></td>
                </tr>
                <tr>
                    <th>Possession Date</th>
                    <td>May 2025</td>
                    <td>May 2025</td>
                    <td></td>
                </tr>
                <tr>
                    <th>RERA Number</th>
                    <td>UPRERAPRJ617209</td>
                    <td>UPRERAPRJ704730</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Floor Plan</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>Amenities</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>Project Canvas</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>               
            </tbody>
        </table>
    </div>
</div>)
}


export default ProjectComparision